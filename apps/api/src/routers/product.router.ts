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
    this.router.post(
      '/alldashboard',
      VerificationToken,
      AdminGuard,
      this.product.fetchProductDashboard,
    );
    this.router.post('/new', this.product.createProduct);
    this.router.patch(
      '/status/:id',
      VerificationToken,
      AdminGuard,
      this.product.changeStatus,
    );
    this.router.delete(
      '/delete/:id',
      VerificationToken,
      AdminGuard,
      this.product.delete,
    );
    this.router.delete(
      '/deleteVariant/:id',
      VerificationToken,
      AdminGuard,
      this.product.deleteVariant,
    );
    this.router.patch(
      '/edit/:id',
      VerificationToken,
      AdminGuard,
      this.product.updateProduct,
    );
    this.router.patch(
      '/updateVariant/:id',
      VerificationToken,
      AdminGuard,
      this.product.updateVariant,
    );
    this.router.get(
      '/fetchForEdit/:id',
      VerificationToken,
      AdminGuard,
      this.product.fetchEditProduct,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
