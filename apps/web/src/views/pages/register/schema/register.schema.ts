import { object, string } from 'yup';

export const RegisterSchema = object({
  name: string().label('Name').min(3).max(100).required(),
  email: string().label('Email').email().min(10).max(100).required(),
  password: string()
    .label('Password')
    .min(8)
    .required()
    .matches(
      /^(?=.*[\d])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+=?/\|"':;><.,`~}{}])(?!.*\s).{6,}$/,
      'Password must contain a combination of one lowercase, one uppercase, one number, one symbol and no space',
    ),
});
