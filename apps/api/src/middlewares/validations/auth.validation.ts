import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const RegisterValidation = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Name must be at least 3 characters'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email')
    .isLength({ min: 10, max: 100 })
    .withMessage('Email must be at least 10 characters'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Email must be at least 8 characters')
    .matches(
      /^(?=.*[\d])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+=?/\|"':;><.,`~}{}])(?!.*\s).{6,}$/,
    )
    .withMessage(
      'Password need to have atleast 1 number and special characters',
    ),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) throw new Error(errors.array()[0].msg);

      next();
    } catch (error) {
      next(error);
    }
  },
];
