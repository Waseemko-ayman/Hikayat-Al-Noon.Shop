import * as Yup from 'yup';

export const postsCategoriesSchema = Yup.object({
  name: Yup.string().required('Category is required'),
});
