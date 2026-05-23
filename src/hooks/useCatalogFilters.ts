'use client';

import { useState, useMemo } from 'react';
import { Camper } from '@/types';

export interface CatalogFilters {
  status: 'all' | 'available' | 'booked';
  priceMin: string;
  priceMax: string;
}

const INITIAL_FILTERS: CatalogFilters = {
  status: 'all',
  priceMin: '',
  priceMax: '',
};

export const useCatalogFilters = (campers: Camper[]) => {
  const [filters, setFilters] = useState<CatalogFilters>(INITIAL_FILTERS);

  const filtered = useMemo(
    () =>
      campers.filter((c) => {
        if (filters.status !== 'all' && c.status !== filters.status) return false;
        if (filters.priceMin !== '' && c.price < Number(filters.priceMin)) return false;
        if (filters.priceMax !== '' && c.price > Number(filters.priceMax)) return false;
        return true;
      }),
    [campers, filters],
  );

  const setStatus = (status: CatalogFilters['status']) =>
    setFilters((prev) => ({ ...prev, status }));

  const setPrice = (key: 'priceMin' | 'priceMax', value: string) => {
    if (value !== '' && !/^\d*$/.test(value)) return;
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => setFilters(INITIAL_FILTERS);

  const hasActiveFilters =
    filters.status !== 'all' || filters.priceMin !== '' || filters.priceMax !== '';

  return { filters, filtered, setStatus, setPrice, resetFilters, hasActiveFilters };
};
