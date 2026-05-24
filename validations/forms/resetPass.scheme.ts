import * as yup from 'yup';
import { passwordRegex } from '@/utils/regex';

export const resetPassScheme = yup.object().shape({
  password: yup
    .string()
    .matches(
      passwordRegex,
      'Password must include uppercase, lowercase, number, special character, and be at least 8 characters long',
    )
    .required('Password is required'),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Password confirmation is required'),
});
