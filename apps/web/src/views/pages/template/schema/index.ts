import { object, string } from 'yup';

const searchSchema = object({
  search: string().trim().label('Search query').min(1).required(),
});

export default searchSchema;
