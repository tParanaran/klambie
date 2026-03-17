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
  async fetchVariants(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;
      const result = await productService.getProductVariant(slug);

      if (!result) {
        return res.status(404).json({
          message: 'Product not found',
        });
      }
      const { variants, img } = result;
      res.status(200).send({
        variants,
        variantImages: img?.variantImages,
      });
    } catch (error) {
      next(error);
    }
  }
  async fetchAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const tag = req.body?.tag;
      const slugs = req.body.slugs;
      const result = await productService.getAllProducts(
        slugs,
        tag,
        req.user?.id,
      );

      if (!result) {
        return res.status(404).json({
          message: 'Product not found',
        });
      }

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async fetchSlugProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;
      const result = await productService.getOneProduct(slug, req.user?.id);

      if (!result) {
        return res.status(404).json({
          message: 'Product not found',
        });
      }
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
