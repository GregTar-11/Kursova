import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { AppUser } from '@/types';
import { COLLECTIONS } from '@/constant/collections';

export class AuthService {
  static async login(email: string, password: string): Promise<AppUser> {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const snap = await getDoc(doc(db, COLLECTIONS.USERS, user.uid));

    if (!snap.exists()) throw new Error('Користувача не знайдено в базі даних');

    const userData = snap.data() as AppUser;
    if (userData.role !== 'admin') throw new Error('Доступ заборонено: недостатньо прав');

    return userData;
  }

  static async loginClient(email: string, password: string): Promise<AppUser> {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const snap = await getDoc(doc(db, COLLECTIONS.USERS, user.uid));
    if (!snap.exists()) throw new Error('Користувача не знайдено');
    return { id: user.uid, ...snap.data() } as AppUser;
  }

  static async register(email: string, password: string): Promise<AppUser> {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    const userData = { email, role: 'client' as const };
    await setDoc(doc(db, COLLECTIONS.USERS, user.uid), userData);
    return { id: user.uid, ...userData };
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
