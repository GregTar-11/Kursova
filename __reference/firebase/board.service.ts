import {
  doc,
  setDoc,
  collection,
  where,
  getDoc,
  updateDoc,
  onSnapshot,
  writeBatch,
} from 'firebase/firestore';
import { db } from '@/services/firebase/firebase.config';
import { COLLECTIONS } from '@/constant/collection';
import { handleError } from './auth.service';
import { IBoard, IColumn } from '@/types/schema/schema.type';
import {
  query,
  orderBy,
  startAt,
  endAt,
  limit,
  getDocs,
} from 'firebase/firestore';
import { AppError } from '@/helpers/AppError';
export type IBoardForm = Omit<IBoard, 'id'>;

export class BoardService {
  static async create(data: IBoardForm): Promise<void> {
    const boardsRef = collection(db, COLLECTIONS.BOARDS);
    const newBoardRef = doc(boardsRef);

    const BoardData: IBoard = {
      id: newBoardRef.id,
      title: data.title,
      logo: data.logo,
      description: data.description,
      memberIds: data.memberIds,
      membersInfo: data.membersInfo,
      columns: data.columns,
    };
    return setDoc(newBoardRef, BoardData).catch(handleError);
  }
  static async edit({
    data,
    boardId,
    deletedColumnIds,
    targetColumn,
  }: {
    data: IBoardForm;
    boardId: string;
    deletedColumnIds: string[];
    targetColumn: IColumn;
  }): Promise<void> {
    const boardRef = doc(db, COLLECTIONS.BOARDS, boardId);
    const batch = writeBatch(db);

    batch.update(boardRef, {
      ...data,
      updatedAt: new Date().toISOString(),
    });

    if (deletedColumnIds.length > 0) {
      for (const colId of deletedColumnIds) {
        const tasksRef = collection(db, 'boards', boardId, 'tasks');
        const q = query(tasksRef, where('columnId', '==', colId));
        const snapshot = await getDocs(q);

        snapshot.forEach((taskDoc) => {
          batch.update(taskDoc.ref, {
            columnId: targetColumn.id,
            columnInfo: { id: targetColumn.id, title: targetColumn.title },
          });
        });
      }
    }

    await batch.commit();
  }
  static async leaveBoard({
    boardId,
    userId,
  }: {
    boardId: string;
    userId: string;
  }) {
    const boardsRef = doc(db, COLLECTIONS.BOARDS, boardId);

    return getDoc(boardsRef)
      .then((snapshot) => {
        if (!snapshot.exists()) throw new AppError('errors.board_not_found_in');
        const currentData = snapshot.data();
        const updatedMemberIds = currentData.memberIds.filter(
          (id: any) => id !== userId,
        );
        const updatedMemberInfo = currentData.memberInfo.filter(
          (member: any) => member.id !== userId,
        );
        return {
          memberIds: updatedMemberIds,
          membersInfo: updatedMemberInfo,
        };
      })
      .then((data) => {
        return updateDoc(boardsRef, data);
      })
      .catch((error) => {
        handleError(error);
        return null;
      });
  }
  static async getOneBoard(boardId: string): Promise<IBoard | null> {
    const boardsRef = doc(db, COLLECTIONS.BOARDS, boardId);

    return getDoc(boardsRef)
      .then((snapshot) => {
        if (!snapshot.exists()) throw new AppError('errors.board_not_found_in');
        return {
          id: snapshot.id,
          ...snapshot.data(),
        } as IBoard;
      })
      .catch((error) => {
        handleError(error);
        return null;
      });
  }
  static async searchUsersByEmail(searchTerm: string) {
    if (!searchTerm) return [];

    const usersRef = collection(db, 'users');

    const q = query(
      usersRef,
      orderBy('email'),
      startAt(searchTerm),
      endAt(searchTerm + '\uf8ff'),
      limit(25),
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        email: data.email,
        fullName: data.fullName,
        avatar: data.avatar,
      };
    });
  }
  static getUsersBoards(
    userId: string,
    onUpdate: (boards: IBoard[]) => void,
    onError: (error: any) => void,
  ) {
    const boardsRef = collection(db, COLLECTIONS.BOARDS);

    const q = query(boardsRef, where('memberIds', 'array-contains', userId));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const boardsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          logo: doc.data().logo,
          title: doc.data().title,
          description: doc.data().description,
          memberIds: doc.data().memberIds,
          membersInfo: doc.data().membersInfo,
          columns: doc.data().columns,
        })) as IBoard[];

        onUpdate(boardsData);
      },
      (error) => {
        onError(error);
      },
    );
    return unsubscribe;
  }
}
