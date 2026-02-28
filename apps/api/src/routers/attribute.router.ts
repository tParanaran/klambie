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
    this.router.post('/brand', this.attribute.createNewBrand);
    this.router.post('/tag', this.attribute.createNewTag);
    this.router.post(`/attribute`, this.attribute.createNewAttribute);
    this.router.post(
      '/attribute-value',
      this.attribute.createNewAttributeValue,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
