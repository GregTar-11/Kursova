import { describe, it, expect } from 'vitest';
import { loginSchema, orderSchema, registerSchema, camperSchema } from './index';

// ─── loginSchema ──────────────────────────────────────────────────────────────

describe('loginSchema', () => {
  const valid = { email: 'admin@ramblers.ua', password: 'password123' };

  it('приймає валідні дані', async () => {
    await expect(loginSchema.validate(valid)).resolves.toBeTruthy();
  });

  it('відхиляє некоректний email', async () => {
    await expect(loginSchema.validate({ ...valid, email: 'not-email' }))
      .rejects.toThrow('Некоректний email');
  });

  it('відхиляє порожній email', async () => {
    await expect(loginSchema.validate({ ...valid, email: '' }))
      .rejects.toThrow('Введіть email');
  });

  it('відхиляє пароль коротше 8 символів', async () => {
    await expect(loginSchema.validate({ ...valid, password: '123' }))
      .rejects.toThrow('Мінімум 8 символів');
  });

  it('відхиляє пароль довше 32 символів', async () => {
    await expect(loginSchema.validate({ ...valid, password: 'a'.repeat(33) }))
      .rejects.toThrow('Максимум 32 символів');
  });
});

// ─── registerSchema ───────────────────────────────────────────────────────────

describe('registerSchema', () => {
  const valid = {
    email: 'user@ramblers.ua',
    password: 'password123',
    confirmPassword: 'password123',
  };

  it('приймає валідні дані', async () => {
    await expect(registerSchema.validate(valid)).resolves.toBeTruthy();
  });

  it('відхиляє якщо паролі не збігаються', async () => {
    await expect(registerSchema.validate({ ...valid, confirmPassword: 'other' }))
      .rejects.toThrow('Паролі не збігаються');
  });

  it('відхиляє порожній confirmPassword', async () => {
    // '' !== password → спрацьовує oneOf раніше ніж required
    await expect(registerSchema.validate({ ...valid, confirmPassword: '' }))
      .rejects.toThrow('Паролі не збігаються');
  });
});

// ─── orderSchema ──────────────────────────────────────────────────────────────

describe('orderSchema', () => {
  const valid = {
    clientName: 'Іван Петренко',
    clientPhone: '+380991234567',
    camperId: '',
  };

  it('приймає валідні дані', async () => {
    await expect(orderSchema.validate(valid)).resolves.toBeTruthy();
  });

  it('приймає порожній camperId', async () => {
    await expect(orderSchema.validate({ ...valid, camperId: '' })).resolves.toBeTruthy();
  });

  it('відхиляє ім\'я коротше 2 символів', async () => {
    await expect(orderSchema.validate({ ...valid, clientName: 'І' }))
      .rejects.toThrow('Мінімум 2 символи');
  });

  it('відхиляє порожнє ім\'я', async () => {
    // ''.length < 2 → спрацьовує min() раніше ніж required()
    await expect(orderSchema.validate({ ...valid, clientName: '' }))
      .rejects.toThrow('Мінімум 2 символи');
  });

  it('відхиляє неправильний формат телефону', async () => {
    await expect(orderSchema.validate({ ...valid, clientPhone: '0991234567' }))
      .rejects.toThrow('Формат: +380XXXXXXXXX');
  });

  it('відхиляє телефон без +', async () => {
    await expect(orderSchema.validate({ ...valid, clientPhone: '380991234567' }))
      .rejects.toThrow('Формат: +380XXXXXXXXX');
  });

  it('відхиляє порожній телефон', async () => {
    await expect(orderSchema.validate({ ...valid, clientPhone: '' }))
      .rejects.toThrow('Введіть номер телефону');
  });
});

// ─── camperSchema ─────────────────────────────────────────────────────────────

describe('camperSchema', () => {
  const valid = {
    name: 'Mercedes Sprinter',
    price: 2000,
    description: 'Просторий кемпер для сімейного відпочинку',
    imageUrl: 'https://example.com/camper.jpg',
    status: 'available',
    features: { engine: '2.2L дизель', beds: 4, tankVolume: 80 },
  };

  it('приймає валідні дані', async () => {
    await expect(camperSchema.validate(valid)).resolves.toBeTruthy();
  });

  it('відхиляє ціну 0', async () => {
    await expect(camperSchema.validate({ ...valid, price: 0 }))
      .rejects.toThrow('Ціна має бути більше 0');
  });

  it('відхиляє некоректний URL зображення', async () => {
    await expect(camperSchema.validate({ ...valid, imageUrl: 'not-url' }))
      .rejects.toThrow('Некоректний URL зображення');
  });

  it('відхиляє невідомий статус', async () => {
    await expect(camperSchema.validate({ ...valid, status: 'unknown' }))
      .rejects.toThrow('Виберіть статус');
  });

  it('відхиляє кількість місць більше 10', async () => {
    await expect(
      camperSchema.validate({ ...valid, features: { ...valid.features, beds: 11 } }),
    ).rejects.toThrow('Максимум 10');
  });

  it('відхиляє об\'єм баку менше 10 л', async () => {
    await expect(
      camperSchema.validate({ ...valid, features: { ...valid.features, tankVolume: 5 } }),
    ).rejects.toThrow('Мінімум 10 л');
  });

  it('відхиляє порожній тип двигуна', async () => {
    await expect(
      camperSchema.validate({ ...valid, features: { ...valid.features, engine: '' } }),
    ).rejects.toThrow('Введіть тип двигуна');
  });
});
