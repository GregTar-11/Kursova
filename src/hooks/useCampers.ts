'use client';

import { useState, useEffect, useCallback } from 'react';
import { Camper } from '@/types';
import { CamperService } from '@/services/camper.service';

export const useCampers = () => {
  const [campers, setCampers] = useState<Camper[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const data = await CamperService.getAll();
    setCampers(data);
  }, []);

  useEffect(() => {
    refresh().finally(() => setLoading(false));
  }, [refresh]);

  return { campers, loading, refresh };
};
