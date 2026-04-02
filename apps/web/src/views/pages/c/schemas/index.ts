import { number, object, ref } from 'yup';

export const PriceFilterSchema = object({
  priceFrom: number()
    .typeError('Must be a number')
    .label('Price from')
    .min(0, 'Cannot be negative')
    .required('Required'),
  priceTo: number()
    .typeError('Must be a number')
    .label('Price to')
    .min(ref('priceFrom'), 'Must be more than')
    .required('Required'),
});
