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
    .email('Некорректный email')
    .required('Введите email'),
  password: yup
    .string()
    .min(AUTH_CONFIG.PASSWORD.MIN, `Минимум ${AUTH_CONFIG.PASSWORD.MIN} символов`)
    .max(AUTH_CONFIG.PASSWORD.MAX, `Максимум ${AUTH_CONFIG.PASSWORD.MAX} символов`)
    .required('Введите пароль'),
});

export type ILoginData = yup.InferType<typeof loginSchema>;

export const orderSchema = yup.object({
  clientName: yup
    .string()
    .trim()
    .min(STRING_CONFIG.MIN, `Минимум ${STRING_CONFIG.MIN} символа`)
    .max(STRING_CONFIG.MAX, `Максимум ${STRING_CONFIG.MAX} символов`)
    .required('Введите ваше имя'),
  clientPhone: yup
    .string()
    .required('Введите номер телефона')
    .matches(PHONE_REGEX, 'Формат: +7XXXXXXXXXX'),
  camperId: yup.string().default(''),
});

export type IOrderData = yup.InferType<typeof orderSchema>;

export const camperSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(STRING_CONFIG.MIN, `Минимум ${STRING_CONFIG.MIN} символа`)
    .max(STRING_CONFIG.MAX, `Максимум ${STRING_CONFIG.MAX} символов`)
    .required('Введите название'),
  price: yup
    .number()
    .typeError('Введите число')
    .min(PRICE_CONFIG.MIN, 'Цена должна быть больше 0')
    .max(PRICE_CONFIG.MAX, `Максимум ${PRICE_CONFIG.MAX}`)
    .required('Введите цену'),
  description: yup
    .string()
    .trim()
    .min(STRING_CONFIG.MIN_DESCRIPTION, `Минимум ${STRING_CONFIG.MIN_DESCRIPTION} символов`)
    .max(STRING_CONFIG.MAX_DESCRIPTION, `Максимум ${STRING_CONFIG.MAX_DESCRIPTION} символов`)
    .required('Введите описание'),
  imageUrl: yup
    .string()
    .url('Некорректный URL изображения')
    .required('Введите URL изображения'),
  status: yup
    .string()
    .oneOf(['available', 'booked'], 'Выберите статус')
    .required('Выберите статус'),
  features: yup.object({
    engine: yup.string().trim().required('Введите тип двигателя'),
    beds: yup
      .number()
      .typeError('Введите число')
      .integer('Только целое число')
      .min(CAMPER_FEATURES_CONFIG.BEDS.MIN, `Минимум ${CAMPER_FEATURES_CONFIG.BEDS.MIN}`)
      .max(CAMPER_FEATURES_CONFIG.BEDS.MAX, `Максимум ${CAMPER_FEATURES_CONFIG.BEDS.MAX}`)
      .required('Введите количество мест'),
    tankVolume: yup
      .number()
      .typeError('Введите число')
      .min(CAMPER_FEATURES_CONFIG.TANK.MIN, `Минимум ${CAMPER_FEATURES_CONFIG.TANK.MIN} л`)
      .max(CAMPER_FEATURES_CONFIG.TANK.MAX, `Максимум ${CAMPER_FEATURES_CONFIG.TANK.MAX} л`)
      .required('Введите объём бака'),
  }),
});

export type ICamperData = yup.InferType<typeof camperSchema>;
