import { AUTH_CONFIG, STRING_CONFIG } from '@/constant/regular';
import * as yup from 'yup';
import { VALIDATION_KEYS } from './createNamespace';

export const getBaseStringSchema = yup
  .string()
  .trim()
  .test(
    'not-only-spaces',
    VALIDATION_KEYS.DONT_SPACE,
    (value) => !!(value && value.trim().length > 0),
  )
  .min(STRING_CONFIG.STRING.MIN, VALIDATION_KEYS.MIN_STRING_LENGTH_MESSAGE)
  .max(STRING_CONFIG.STRING.MAX, VALIDATION_KEYS.MAX_STRING_LENGTH_MESSAGE);

export const getPasswordRules = yup
  .string()
  .max(AUTH_CONFIG.PASSWORD.MAX, VALIDATION_KEYS.PASSWORD_TOO_LONG)
  .min(AUTH_CONFIG.PASSWORD.MIN, VALIDATION_KEYS.PASSWORD_TOO_SHORT)
  .required(VALIDATION_KEYS.PASSWORD_REQUIRED);

export const emailSchema = yup
  .string()
  .trim()
  .test(
    'not-only-spaces',
    VALIDATION_KEYS.DONT_SPACE,
    (value) => !!(value && value.trim().length > 0),
  )
  .email(VALIDATION_KEYS.EMAIL_INVALID)
  .required(VALIDATION_KEYS.EMAIL_REQUIRED);

export const getBoardSchema = yup
  .string()
  .trim()
  .test(
    'not-only-spaces',
    VALIDATION_KEYS.DONT_SPACE,
    (value) => !!(value && value.trim().length > 0),
  )
  .min(STRING_CONFIG.STRING.MIN, VALIDATION_KEYS.MIN_STRING_LENGTH_MESSAGE)
  .max(STRING_CONFIG.STRING.MAX, VALIDATION_KEYS.MAX_STRING_LENGTH_MESSAGE);
