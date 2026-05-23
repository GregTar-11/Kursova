import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  limit,
  where,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Camper } from '@/types';
import { COLLECTIONS } from '@/constant/collections';
import { CAMPER_STATUS, TOP_CAMPERS_COUNT } from '@/constant/regular';

export class CamperService {
  static async getAll(): Promise<Camper[]> {
    const snapshot = await getDocs(collection(db, COLLECTIONS.CAMPERS));
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Camper);
  }

  static async getTopAvailable(): Promise<Camper[]> {
    const q = query(
      collection(db, COLLECTIONS.CAMPERS),
      where('status', '==', CAMPER_STATUS.AVAILABLE),
      limit(TOP_CAMPERS_COUNT),
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Camper);
  }

  static async getById(id: string): Promise<Camper | null> {
    const snap = await getDoc(doc(db, COLLECTIONS.CAMPERS, id));
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() } as Camper;
  }

  static async create(data: Omit<Camper, 'id'>): Promise<string> {
    const ref = await addDoc(collection(db, COLLECTIONS.CAMPERS), data);
    return ref.id;
  }

  static async update(id: string, data: Partial<Omit<Camper, 'id'>>): Promise<void> {
    return updateDoc(doc(db, COLLECTIONS.CAMPERS, id), data);
  }

  static async delete(id: string): Promise<void> {
    return deleteDoc(doc(db, COLLECTIONS.CAMPERS, id));
  }
}
