import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  orderBy,
  onSnapshot,
  Unsubscribe,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Order } from '@/types';
import { COLLECTIONS } from '@/constant/collections';
import { ORDER_STATUS } from '@/constant/regular';

export class OrderService {
  static async create(
    data: Pick<Order, 'clientName' | 'clientPhone' | 'camperId'>,
  ): Promise<string> {
    const ref = await addDoc(collection(db, COLLECTIONS.ORDERS), {
      ...data,
      createdAt: Date.now(),
      status: ORDER_STATUS.NEW,
    });
    return ref.id;
  }

  static async getAll(): Promise<Order[]> {
    const q = query(collection(db, COLLECTIONS.ORDERS), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Order);
  }

  static async updateStatus(id: string, status: Order['status']): Promise<void> {
    return updateDoc(doc(db, COLLECTIONS.ORDERS, id), { status });
  }

  static subscribeToOrders(callback: (orders: Order[]) => void): Unsubscribe {
    const q = query(collection(db, COLLECTIONS.ORDERS), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const orders = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Order);
      callback(orders);
    });
  }
}
