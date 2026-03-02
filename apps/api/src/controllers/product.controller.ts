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
      const { slug } = req.params;
      const tag = req.query.tag as string;
      const result = await productService.getAllProducts(
        slug,
        tag,
        req.user?.id,
      );
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async fetchSlugProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;

      const result = await productService.getOneProduct(slug, req.user?.id);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
