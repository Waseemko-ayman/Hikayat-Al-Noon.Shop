import * as Yup from 'yup';

export const shippingSettingsSchema = Yup.object({
  shipping: Yup.number()
    .typeError('Shipping cost must be a number')
    .min(0, 'Shipping cost must be greater than or equal to 0')
    .required('Shipping cost is required'),

  free_shipping_min: Yup.number()
    .typeError('Minimum amount must be a number')
    .min(0, 'Minimum amount must be greater than or equal to 0')
    .required('Free shipping minimum is required'),
});
