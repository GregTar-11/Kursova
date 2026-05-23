import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCatalogFilters } from './useCatalogFilters';
import { Camper } from '@/types';

const makeCamper = (overrides: Partial<Camper>): Camper => ({
  id: '1',
  name: 'Test',
  price: 1000,
  description: 'desc',
  imageUrl: '',
  status: 'available',
  features: { engine: '2.0L', beds: 2, tankVolume: 60 },
  ...overrides,
});

const CAMPERS: Camper[] = [
  makeCamper({ id: '1', name: 'Alpha', price: 1000, status: 'available' }),
  makeCamper({ id: '2', name: 'Beta',  price: 2000, status: 'booked'    }),
  makeCamper({ id: '3', name: 'Gamma', price: 3000, status: 'available' }),
];

describe('useCatalogFilters', () => {
  it('початково повертає всі кемпери', () => {
    const { result } = renderHook(() => useCatalogFilters(CAMPERS));
    expect(result.current.filtered).toHaveLength(3);
  });

  it('початково hasActiveFilters = false', () => {
    const { result } = renderHook(() => useCatalogFilters(CAMPERS));
    expect(result.current.hasActiveFilters).toBe(false);
  });

  it('фільтрує за статусом available', () => {
    const { result } = renderHook(() => useCatalogFilters(CAMPERS));
    act(() => result.current.setStatus('available'));
    expect(result.current.filtered).toHaveLength(2);
    expect(result.current.filtered.every((c) => c.status === 'available')).toBe(true);
  });

  it('фільтрує за статусом booked', () => {
    const { result } = renderHook(() => useCatalogFilters(CAMPERS));
    act(() => result.current.setStatus('booked'));
    expect(result.current.filtered).toHaveLength(1);
    expect(result.current.filtered[0].id).toBe('2');
  });

  it('фільтрує за мінімальною ціною', () => {
    const { result } = renderHook(() => useCatalogFilters(CAMPERS));
    act(() => result.current.setPrice('priceMin', '1500'));
    expect(result.current.filtered).toHaveLength(2);
    expect(result.current.filtered.every((c) => c.price >= 1500)).toBe(true);
  });

  it('фільтрує за максимальною ціною', () => {
    const { result } = renderHook(() => useCatalogFilters(CAMPERS));
    act(() => result.current.setPrice('priceMax', '2000'));
    expect(result.current.filtered).toHaveLength(2);
    expect(result.current.filtered.every((c) => c.price <= 2000)).toBe(true);
  });

  it('комбінує фільтри статусу та ціни', () => {
    const { result } = renderHook(() => useCatalogFilters(CAMPERS));
    act(() => { result.current.setStatus('available'); result.current.setPrice('priceMin', '2000'); });
    expect(result.current.filtered).toHaveLength(1);
    expect(result.current.filtered[0].id).toBe('3');
  });

  it('повертає порожній масив якщо нічого не підходить', () => {
    const { result } = renderHook(() => useCatalogFilters(CAMPERS));
    act(() => result.current.setPrice('priceMin', '9999'));
    expect(result.current.filtered).toHaveLength(0);
  });

  it('ігнорує нечислові значення ціни', () => {
    const { result } = renderHook(() => useCatalogFilters(CAMPERS));
    act(() => result.current.setPrice('priceMin', 'abc'));
    expect(result.current.filtered).toHaveLength(3);
  });

  it('hasActiveFilters = true після зміни статусу', () => {
    const { result } = renderHook(() => useCatalogFilters(CAMPERS));
    act(() => result.current.setStatus('available'));
    expect(result.current.hasActiveFilters).toBe(true);
  });

  it('hasActiveFilters = true після зміни ціни', () => {
    const { result } = renderHook(() => useCatalogFilters(CAMPERS));
    act(() => result.current.setPrice('priceMin', '500'));
    expect(result.current.hasActiveFilters).toBe(true);
  });

  it('resetFilters повертає початковий стан', () => {
    const { result } = renderHook(() => useCatalogFilters(CAMPERS));
    act(() => { result.current.setStatus('booked'); result.current.setPrice('priceMin', '1500'); });
    act(() => result.current.resetFilters());
    expect(result.current.filtered).toHaveLength(3);
    expect(result.current.hasActiveFilters).toBe(false);
  });
});
