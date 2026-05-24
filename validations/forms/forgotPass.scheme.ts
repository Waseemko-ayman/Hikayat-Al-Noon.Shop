import * as yup from 'yup';
import { emailRegex } from '@/utils/regex';

export const forgotPassScheme = yup.object().shape({
  email: yup
    .string()
    .email()
    .matches(emailRegex, 'Email format is incorrect')
    .required('Email is required'),
});
