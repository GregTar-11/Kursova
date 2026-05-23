'use client';

import { useState, useEffect } from 'react';
import { Order } from '@/types';
import { OrderService } from '@/services/order.service';
import { CamperService } from '@/services/camper.service';

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [camperNames, setCamperNames] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    CamperService.getAll().then((campers) => {
      setCamperNames(Object.fromEntries(campers.map((c) => [c.id, c.name])));
    });

    const unsubscribe = OrderService.subscribeToOrders((data) => {
      setOrders(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { orders, camperNames, loading };
};
