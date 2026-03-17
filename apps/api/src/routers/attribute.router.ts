import { Attribute } from '@/controllers/attribute.controller';
import { AdminGuard, VerificationToken } from '@/middlewares/auth.middlleware';

import { Router } from 'express';

export class AttributeRouter {
  private router: Router;
  private attribute: Attribute;

  constructor() {
    this.attribute = new Attribute();

    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/category', this.attribute.createNewCategory);
    this.router.get('/tree', this.attribute.getCategoryTree);
    this.router.post('/brand', this.attribute.createNewBrand);
    this.router.patch('/brand/:slug', this.attribute.updateBrand);
    this.router.post('/tag', this.attribute.createNewTag);
    this.router.get('/tag', this.attribute.fetchTag);
    this.router.post(`/attribute`, this.attribute.createNewAttribute);
    this.router.post(
      '/attribute-value',
      this.attribute.createNewAttributeValue,
    );
    this.router.patch(
      '/attribute-value/:slug',
      this.attribute.updateAttributeValue,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
