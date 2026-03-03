import { alphanumericWithArabicRegex, phoneReqExp } from '@/utils/regex';
import * as yup from 'yup';

export const createUsersSchema = yup.object({
  firstName: yup
    .string()
    .matches(
      alphanumericWithArabicRegex,
      'first name must contain only letters or numbers and be at least two characters long',
    )
    .required('Name is required'),
  lastName: yup
    .string()
    .matches(
      alphanumericWithArabicRegex,
      'last name must contain only letters or numbers and be at least two characters long',
    )
    .required('Name is required'),
  email: yup.string().email().required('Email is required'),
  phone: yup.string().nullable().notRequired().matches(phoneReqExp, {
    message: 'Phone must be in E.164 format (e.g. +970...)',
    excludeEmptyString: true,
  }),
  password: yup.string().required('password is required'),
  role: yup.string().required('Role is required'),

  avatar_file: yup.mixed().nullable().optional(),
});
