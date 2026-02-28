import { ProductService } from '@/services/product.service';
import { Request, Response, NextFunction } from 'express';

const productService = new ProductService();

export class Product {
  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await productService.newProduct(req.body);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async fetchAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await productService.getAllProducts();
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async fetchSlugProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await productService.getOneProduct(req.params.slug);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
