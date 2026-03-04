import { Cart } from '@/controllers/cart.controller';
import {
  AdminGuard,
  IsUserLogin,
  VerificationToken,
} from '@/middlewares/auth.middlleware';

import { Router } from 'express';

export class CartRouter {
  private router: Router;
  private cart: Cart;

  constructor() {
    this.cart = new Cart();

    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/add', IsUserLogin, this.cart.addCart);
    this.router.get('/fetch', IsUserLogin, this.cart.fetchCart);
  }

  getRouter(): Router {
    return this.router;
  }
}
