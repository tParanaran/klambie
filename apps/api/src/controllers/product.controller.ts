import { ProductService } from '@/services/product.service';
import { Request, Response, NextFunction } from 'express';

const productService = new ProductService();

export class Product {
  async CreateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await productService.newProduct(req.body);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async fetchAllProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await productService.getAllProducts();
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
