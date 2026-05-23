import { PHONE_REGEX } from '@/constant/regular';
import { VALIDATION_KEYS } from '@/helpers/createNamespace';

import {
  emailSchema,
  getBaseStringSchema,
  getBoardSchema,
  getPasswordRules,
} from '@/helpers/rules';
import * as yup from 'yup';

export const loginSchema = yup.object({
  email: emailSchema,
  password: getPasswordRules,
});

export type ILoginData = yup.InferType<typeof loginSchema>;

export const signupSchema = yup.object({
  firstName: getBaseStringSchema.required(VALIDATION_KEYS.FIRST_NAME_REQUIRED),
  lastName: getBaseStringSchema.required(VALIDATION_KEYS.LAST_NAME_REQUIRED),
  phone: yup
    .string()
    .required(VALIDATION_KEYS.PHONE_REQUIRED)
    .matches(PHONE_REGEX, VALIDATION_KEYS.PHONE_INVALID),

  email: emailSchema,
  password: getPasswordRules,
  passwordAgain: yup
    .string()
    .oneOf([yup.ref('password')], VALIDATION_KEYS.PASSWORD_MATCH)
    .required(VALIDATION_KEYS.PASSWORD_AGAIN_REQUIRED),
  avatar: yup.string().url().nullable().default(null),
});

export type ISignupData = yup.InferType<typeof signupSchema>;

export const boardSchema = yup.object({
  title: getBoardSchema.required(VALIDATION_KEYS.TITLE_REQUIRED),
  description: yup.string().trim().nullable().default(null),
  memberIds: yup.string().url().nullable().default(null),
  logo: yup.string().url().nullable().default(null),
});
export type IBoardData = yup.InferType<typeof boardSchema>;

export const taskSchema = yup.object({
  title: getBoardSchema.required(VALIDATION_KEYS.TITLE_REQUIRED),
  description: yup.string().trim().nullable().default(null),
  assigneeId: yup.string().nullable().default(null),
  files: yup.array().of(yup.string().url()).default([]),
});

export const taskEditSchema = yup.object({
  title: getBoardSchema.required(VALIDATION_KEYS.TITLE_REQUIRED),
  description: yup.string().trim().nullable().default(null),
  assigneeId: yup.string().nullable().default(null),
  files: yup.array().of(yup.string().url()).default([]),

  estimationTime: yup.number().nullable().default(null),
  logWork: yup.array().default([]),
});
export type ITaskData = yup.InferType<typeof taskSchema>;

export const logWorkSchema = yup.object({
  timeSpent: yup
    .string()
    .required(VALIDATION_KEYS.TIME_REQUIRED)
    .matches(/^(\d+\s*h)?\s*(\d+\s*m)?$/i, VALIDATION_KEYS.TIME_FORMAT_INVALID),
  comment: yup.string().default(null).nullable(),
});