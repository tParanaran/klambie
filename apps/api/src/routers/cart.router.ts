import { Cart } from '@/controllers/cart.controller';
import { IsUserLogin } from '@/middlewares/auth.middlleware';

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
    this.router.get('/count', IsUserLogin, this.cart.count);
    this.router.get('/get', IsUserLogin, this.cart.fetchCart);
    this.router.delete('/delete/:productId', IsUserLogin, this.cart.delete);
  }

  getRouter(): Router {
    return this.router;
  }
}
