import { object, string } from 'yup';

export const LoginSchema = object({
  email: string().label('Email').email().min(10).max(100).required(),
  password: string().label('Password').min(8).required(),
});
