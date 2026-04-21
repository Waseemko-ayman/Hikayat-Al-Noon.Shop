import * as yup from 'yup';

export const faqSchema = yup.object({
  question: yup
    .string()
    .required('Question is required')
    .min(5, 'Question must be at least 5 characters'),

  category: yup
    .string()
    .oneOf(['orders', 'payments', 'shipping', 'returns', 'general'])
    .required('Category is required'),

  answer: yup
    .string()
    .required('Answer is required')
    .min(10, 'Answer must be at least 10 characters'),
});
