import { Cart } from '@/controllers/cart.controller';
import { IsUserLogin } from '@/middlewares/auth.middlleware';
import {
  AddCartValidation,
  QtyValidation,
} from '@/middlewares/validations/cart.validation';

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
    this.router.post('/add', IsUserLogin, AddCartValidation, this.cart.addCart);
    this.router.get('/count', IsUserLogin, this.cart.count);
    this.router.get('/get', IsUserLogin, this.cart.fetchCart);
    this.router.delete('/delete/:productId', IsUserLogin, this.cart.delete);
    this.router.patch(
      '/update-qty/:productId',
      IsUserLogin,
      QtyValidation,
      this.cart.updateQty,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
