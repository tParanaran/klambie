import { object, string } from 'yup';

export const ResendSchema = object({
  email: string().label('Email').email().min(10).max(100).required(),
});
