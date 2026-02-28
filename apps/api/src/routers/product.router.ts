import { Product } from '@/controllers/product.controller';
import { AdminGuard, VerificationToken } from '@/middlewares/auth.middlleware';

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
    this.router.get('/all', this.product.fetchAllProducts);
    this.router.get('/:slug', this.product.fetchSlugProduct);
    this.router.post('/new', this.product.createProduct);
  }

  getRouter(): Router {
    return this.router;
  }
}
