import {
  doc,
  setDoc,
  collection,
  where,
  getDoc,
  updateDoc,
  onSnapshot,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore';
import { db } from '@/services/firebase/firebase.config';
import { COLLECTIONS } from '@/constant/collection';
import { handleError } from './auth.service';
import { ITask, IColumn } from '@/types/schema/schema.type';
import {
  query,
  orderBy,
  startAt,
  endAt,
  limit,
  getDocs,
} from 'firebase/firestore';
import { AppError } from '@/helpers/AppError';
export type ITaskForm = Omit<ITask, 'id'>;

export type ITaskEditForm = Omit<ITask, 'id'>;

export class TaskService {
  static async create({
    data,
    boardId,
  }: {
    data: ITaskForm;
    boardId: string;
  }): Promise<void> {
    const tasksRef = collection(
      db,
      COLLECTIONS.BOARDS,
      boardId,
      COLLECTIONS.TASKS,
    );
    const newTaskRef = doc(tasksRef);

    const q = query(
      tasksRef,
      where('columnId', '==', data.columnId),
      orderBy('order', 'desc'),
      limit(1),
    );
    const orderSnapshot = await getDocs(q);

    let newOrder = 65403;
    if (!orderSnapshot.empty) {
      const orderBig = orderSnapshot.docs[0].data().order;
      newOrder = orderBig + 65403;
    }
    const TaskData: Omit<ITask, 'comments' | 'logWork'> = {
      id: newTaskRef.id,
      title: data.title,
      boardId: data.boardId,
      columnId: data.columnId,
      columnInfo: data.columnInfo,
      description: data.description,
      assigneeId: data.assigneeId,
      assigneeInfo: data.assigneeInfo,
      estimationTime: data.estimationTime,
      files: data.files,
      createdAt: data.createdAt,
      order: newOrder,
    };
    return setDoc(newTaskRef, TaskData).catch(handleError);
  }

  static async getOneTask(
    taskId: string,
    boardId: string,
  ): Promise<ITask | null> {
    const tasksRef = doc(
      db,
      COLLECTIONS.BOARDS,
      boardId,
      COLLECTIONS.TASKS,
      taskId,
    );

    return getDoc(tasksRef)
      .then((snapshot) => {
        if (!snapshot.exists()) throw new AppError('errors.unknown');
        return {
          id: snapshot.id,
          ...snapshot.data(),
        } as ITask;
      })
      .catch((error) => {
        handleError(error);
        return null;
      });
  }
  static async getAllTaskOfBoard(boardId: string) {
    const tasksRef = collection(
      db,
      COLLECTIONS.BOARDS,
      boardId,
      COLLECTIONS.TASKS,
    );
    return getDocs(tasksRef)
      .then((snapshot) => {
        if (!snapshot.docs) throw new AppError('errors.board_not_found_in');
        return snapshot.docs.map((item) => {
          return {
            id: item.id,
            ...item.data(),
          } as ITask;
        });
      })
      .catch((error) => {
        handleError(error);
        return null;
      });
  }
  static edit({
    boardId,
    taskId,
    data,
  }: {
    boardId: string;
    taskId: string;
    data: Partial<ITaskEditForm>;
  }): Promise<void> {
    const taskRef = doc(
      db,
      COLLECTIONS.BOARDS,
      boardId,
      COLLECTIONS.TASKS,
      taskId,
    );

    return updateDoc(taskRef, data).catch(handleError);
  }
  static updateTaskPosition({
    boardId,
    taskId,
    columnId,
    columnInfo,
    order,
  }: {
    boardId: string;
    taskId: string;
    columnInfo: IColumn;
    columnId: string;
    order: number;
  }): Promise<void> {
    const taskRef = doc(
      db,
      COLLECTIONS.BOARDS,
      boardId,
      COLLECTIONS.TASKS,
      taskId,
    );

    return updateDoc(taskRef, {
      columnId: columnId,
      columnInfo: columnInfo,
      order: order,
    }).catch(handleError);
  }
  static async deleteColumnInTask({
    boardId,
    deleteColumnId,
    firstColumnId,
    firstColumnInfo,
  }: {
    deleteColumnId: string;
    boardId: string;
    firstColumnId: string;
    firstColumnInfo: string;
  }): Promise<void> {
    const batch = writeBatch(db);

    const taskRef = collection(
      db,
      COLLECTIONS.BOARDS,
      boardId,
      COLLECTIONS.TASKS,
    );
    const q = query(taskRef, where('columnId', '==', deleteColumnId));
    const taskSnapshot = await getDocs(q);
    taskSnapshot.forEach((taskData) => {
      batch.update(taskData.ref, {
        columnId: firstColumnId,
        columnInfo: firstColumnInfo,
      });
    });
    // return updateDoc(taskRef, {
    //   columnId: columnId,
    //   columnInfo: columnInfo,
    //   order: order,
    // }).catch(handleError);
  }
}
