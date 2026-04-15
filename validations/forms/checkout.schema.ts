import * as yup from 'yup';

export const checkoutSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email().required('Email is required'),
});
