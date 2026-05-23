import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { AppUser } from '@/types';
import { COLLECTIONS } from '@/constant/collections';

export class AuthService {
  static async login(email: string, password: string): Promise<AppUser> {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const snap = await getDoc(doc(db, COLLECTIONS.USERS, user.uid));

    if (!snap.exists()) throw new Error('Пользователь не найден в базе данных');

    const userData = snap.data() as AppUser;
    if (userData.role !== 'admin') throw new Error('Доступ запрещён: недостаточно прав');

    return userData;
  }

  static async logout(): Promise<void> {
    return firebaseSignOut(auth);
  }

  static async getUser(uid: string): Promise<AppUser | null> {
    const snap = await getDoc(doc(db, COLLECTIONS.USERS, uid));
    if (!snap.exists()) return null;
    return snap.data() as AppUser;
  }
}
