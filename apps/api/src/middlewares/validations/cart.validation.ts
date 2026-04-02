import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const QtyValidation = [
  body('data.quantity')
    .notEmpty()
    .withMessage('Quantity is required')
    .isInt({ min: 1 })
    .withMessage('Quantity must be number and at least 1'),
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

export const AddCartValidation = [
  body('productVariantId')
    .notEmpty()
    .withMessage('Product ID is required')
    .isInt()
    .withMessage('Product ID must be number'),
  body('quantity')
    .notEmpty()
    .withMessage('Quantity is required')
    .isInt({ min: 1 })
    .withMessage('Quantity must be number and at least 1'),
  body('unitPrice')
    .notEmpty()
    .withMessage('Unit Price is required')
    .isInt({ min: 1 })
    .withMessage('Unit Price must be number and at least 1'),
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
