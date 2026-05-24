import * as yup from 'yup';
import {
  AUTH_CONFIG,
  CAMPER_FEATURES_CONFIG,
  PHONE_REGEX,
  PRICE_CONFIG,
  STRING_CONFIG,
} from '@/constant/regular';

export const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Некоректний email')
    .required('Введіть email'),
  password: yup
    .string()
    .min(AUTH_CONFIG.PASSWORD.MIN, `Мінімум ${AUTH_CONFIG.PASSWORD.MIN} символів`)
    .max(AUTH_CONFIG.PASSWORD.MAX, `Максимум ${AUTH_CONFIG.PASSWORD.MAX} символів`)
    .required('Введіть пароль'),
});

export type ILoginData = yup.InferType<typeof loginSchema>;

export const registerSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Некоректний email')
    .required('Введіть email'),
  password: yup
    .string()
    .min(AUTH_CONFIG.PASSWORD.MIN, `Мінімум ${AUTH_CONFIG.PASSWORD.MIN} символів`)
    .max(AUTH_CONFIG.PASSWORD.MAX, `Максимум ${AUTH_CONFIG.PASSWORD.MAX} символів`)
    .required('Введіть пароль'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Паролі не збігаються')
    .required('Підтвердіть пароль'),
});

export type IRegisterData = yup.InferType<typeof registerSchema>;

export const orderSchema = yup.object({
  clientName: yup
    .string()
    .trim()
    .min(STRING_CONFIG.MIN, `Мінімум ${STRING_CONFIG.MIN} символи`)
    .max(STRING_CONFIG.MAX, `Максимум ${STRING_CONFIG.MAX} символів`)
    .required("Введіть ваше ім'я"),
  clientPhone: yup
    .string()
    .required('Введіть номер телефону')
    .matches(PHONE_REGEX, 'Формат: +380XXXXXXXXX'),
  camperId: yup.string().default(''),
});

export type IOrderData = yup.InferType<typeof orderSchema>;

export const camperSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(STRING_CONFIG.MIN, `Мінімум ${STRING_CONFIG.MIN} символи`)
    .max(STRING_CONFIG.MAX, `Максимум ${STRING_CONFIG.MAX} символів`)
    .required('Введіть назву'),
  price: yup
    .number()
    .typeError('Введіть число')
    .min(PRICE_CONFIG.MIN, 'Ціна має бути більше 0')
    .max(PRICE_CONFIG.MAX, `Максимум ${PRICE_CONFIG.MAX}`)
    .required('Введіть ціну'),
  description: yup
    .string()
    .trim()
    .min(STRING_CONFIG.MIN_DESCRIPTION, `Мінімум ${STRING_CONFIG.MIN_DESCRIPTION} символів`)
    .max(STRING_CONFIG.MAX_DESCRIPTION, `Максимум ${STRING_CONFIG.MAX_DESCRIPTION} символів`)
    .required('Введіть опис'),
  imageUrl: yup
    .string()
    .url('Некоректний URL зображення')
    .required('Введіть URL зображення'),
  status: yup
    .string()
    .oneOf(['available', 'booked'], 'Виберіть статус')
    .required('Виберіть статус'),
  features: yup.object({
    engine: yup.string().trim().required('Введіть тип двигуна'),
    beds: yup
      .number()
      .typeError('Введіть число')
      .integer('Тільки ціле число')
      .min(CAMPER_FEATURES_CONFIG.BEDS.MIN, `Мінімум ${CAMPER_FEATURES_CONFIG.BEDS.MIN}`)
      .max(CAMPER_FEATURES_CONFIG.BEDS.MAX, `Максимум ${CAMPER_FEATURES_CONFIG.BEDS.MAX}`)
      .required('Введіть кількість місць'),
    tankVolume: yup
      .number()
      .typeError('Введіть число')
      .min(CAMPER_FEATURES_CONFIG.TANK.MIN, `Мінімум ${CAMPER_FEATURES_CONFIG.TANK.MIN} л`)
      .max(CAMPER_FEATURES_CONFIG.TANK.MAX, `Максимум ${CAMPER_FEATURES_CONFIG.TANK.MAX} л`)
      .required("Введіть об'єм баку"),
  }),
});

export type ICamperData = yup.InferType<typeof camperSchema>;
