export const AUTH_CONFIG = {
  PASSWORD: {
    MIN: 8,
    MAX: 32,
  },
} as const;

export const STRING_CONFIG = {
  MIN: 2,
  MAX: 60,
  MIN_DESCRIPTION: 10,
  MAX_DESCRIPTION: 1000,
} as const;

export const PRICE_CONFIG = {
  MIN: 1,
  MAX: 1_000_000,
} as const;

export const CAMPER_FEATURES_CONFIG = {
  BEDS: { MIN: 1, MAX: 10 },
  TANK: { MIN: 10, MAX: 500 },
} as const;

export const PHONE_REGEX = /^\+[1-9]\d{8,14}$/;

export const CAMPER_STATUS = {
  AVAILABLE: 'available',
  BOOKED: 'booked',
} as const;

export const ORDER_STATUS = {
  NEW: 'new',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
} as const;

export const ORDER_STATUS_LABELS: Record<string, string> = {
  new: 'Новий',
  'in-progress': 'В обробці',
  completed: 'Завершений',
};

export const CAMPER_STATUS_LABELS: Record<string, string> = {
  available: 'Доступний',
  booked: 'Заброньований',
};

export const TOP_CAMPERS_COUNT = 4;

export const FILE_CONFIG = {
  MAX_SIZE_BYTES: 2 * 1024 * 1024,
  ALLOWED_FORMATS: ['image/jpeg', 'image/png', 'image/webp'],
  ALLOWED_DOC_FORMATS: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
  ],
} as const;
