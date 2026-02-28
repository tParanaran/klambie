import { Promotion } from '@/controllers/promotion.controller';
import { AdminGuard, VerificationToken } from '@/middlewares/auth.middlleware';

import { Router } from 'express';

export class PromotionRouter {
  private router: Router;

  private promotion: Promotion;

  constructor() {
    this.promotion = new Promotion();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/new', this.promotion.createNewPromotion);
  }

  getRouter(): Router {
    return this.router;
  }
}
