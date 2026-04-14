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
      const { variants, img, groupedAttributes } = result;
      res.status(200).send({
        variants,
        groupedAttributes,
        variantImages: img?.variantImages,
      });
    } catch (error) {
      next(error);
    }
  }
  async fetchAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user?.id;

      const result = await productService.getAllProducts({ ...req.body, user });

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
  async fetchProductDashboard(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await productService.getProductDashboard({ ...req.body });

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
  async changeStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await productService.toggleProductStatus(
        Number(id),
        req.body,
      );
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await productService.deleteProduct(Number(id));
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async deleteVariant(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await productService.deleteVariant(Number(id));
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async uppdateVariant(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const result = await productService.updateVariant(Number(id), req.body);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
