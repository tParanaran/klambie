import { BrandAttribute } from '@/controllers/brandAttribute.controller';
import { Category } from '@/controllers/category.controller';
import { Product } from '@/controllers/product.controller';
import { Promotion } from '@/controllers/promo.controller';
import { AdminGuard, VerificationToken } from '@/middlewares/auth.middlleware';

import { Router } from 'express';

export class ProductRouter {
  private router: Router;
  private product: Product;
  private category: Category;
  private brandAttribute: BrandAttribute;
  private promotion: Promotion;

  constructor() {
    this.product = new Product();
    this.category = new Category();
    this.brandAttribute = new BrandAttribute();
    this.promotion = new Promotion();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/products', this.product.fetchAllProduct);
    this.router.get('/:slug', this.product.fetchSlugProduct);
    this.router.post('/add-product', this.product.CreateProduct);
    this.router.post('/add-promo', this.promotion.createNewPromo);
    this.router.post('/generate-category', this.category.generateHierarchy);
    this.router.post('/add-brand', this.brandAttribute.createNewBrand);
    this.router.post('/add-tag', this.brandAttribute.createNewTag);
    this.router.post(`/add-attribute`, this.brandAttribute.createNewAttribute);
    this.router.post(
      '/add-attribute-value',
      this.brandAttribute.addNewAttributeValue,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
