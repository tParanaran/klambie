import { Product } from '@/controllers/product.controller';
import {
  AdminGuard,
  IsUserLogin,
  VerificationToken,
} from '@/middlewares/auth.middlleware';

import { Router } from 'express';

export class ProductRouter {
  private router: Router;
  private product: Product;

  constructor() {
    this.product = new Product();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/all', IsUserLogin, this.product.fetchAllProducts);
    this.router.get('/:slug', IsUserLogin, this.product.fetchSlugProduct);
    this.router.get('/variants/:slug', IsUserLogin, this.product.fetchVariants);
    this.router.post('/new', this.product.createProduct);
  }

  getRouter(): Router {
    return this.router;
  }
}
