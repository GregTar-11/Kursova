export const AUTH_CONFIG = {
  PASSWORD: {
    MIN: 8,
    MAX: 16,
  },
} as const;

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

export const STRING_CONFIG = {
  STRING: {
    MIN: 2,
    MAX: 30,
    MIN_TITLE: 3,
    MAX_TITLE: 60,
  },
} as const;

export const DIMENSIONS = {
  MIN: 100,
  MAX: 1000,
};

export const PHONE_REGEX = /^\+[1-9]\d{8,14}$/;

export const ORDER_STEPS = 65434;
