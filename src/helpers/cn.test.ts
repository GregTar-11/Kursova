import { describe, it, expect } from 'vitest';
import { cn } from './cn';

describe('cn', () => {
  it('повертає порожній рядок без аргументів', () => {
    expect(cn()).toBe('');
  });

  it('об\'єднує кілька класів', () => {
    expect(cn('a', 'b', 'c')).toBe('a b c');
  });

  it('фільтрує false, undefined, null', () => {
    expect(cn('a', false, undefined, null, 'b')).toBe('a b');
  });

  it('підтримує умовні об\'єкти', () => {
    expect(cn({ active: true, hidden: false })).toBe('active');
  });

  it('вирішує конфлікти Tailwind на користь останнього класу', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });

  it('вирішує конфлікти з умовними класами', () => {
    expect(cn('p-4', true && 'p-8')).toBe('p-8');
  });
});
