import * as yup from 'yup';

export const createPostsSchema = yup.object({
  title: yup.string().required('Title is required'),
  excerpt: yup.string().max(200, 'Excerpt too long').nullable(),
  image: yup.mixed().required('Image is required'),
  category: yup.string().required('Category is required'),
  date: yup.string().required('Date is required'),
  is_featured: yup.boolean().default(false),
});
