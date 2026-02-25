import { AddProduct } from '@/services/product.service';
import { Request, Response, NextFunction } from 'express';

const addProduct = new AddProduct();

export class Product {
  async CreateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await addProduct.newProduct(req.body);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
