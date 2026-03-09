import { CartService } from '@/services/cart.service';
import { Request, Response, NextFunction } from 'express';

const cartService = new CartService();

export class Cart {
  async addCart(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await cartService.addOrUpdateCart(
        req.body,
        req.cookies.sessionId,
        req.user?.id,
      );
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async count(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await cartService.getTotalCart(
        req.cookies.sessionId,
        req.user?.id,
      );
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async fetchCart(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await cartService.getCartItems(
        req.cookies.sessionId,
        req.user?.id,
      );
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId } = req.params;
      const result = await cartService.deleteCart(
        Number(productId),
        req.cookies.sessionId,
        req.user?.id,
      );
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async updateQty(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId } = req.params;
      const quantity = req.body.data?.quantity;

      const result = await cartService.addUpdateQty(
        Number(productId),
        quantity,
        req.cookies.sessionId,
        req.user?.id,
      );
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async changeVariant(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId } = req.params;
      const newProductId = req.body.data?.newProductId;
      const quantity = req.body.data?.quantity;

      const result = await cartService.changeVariant(
        Number(productId),
        newProductId,
        quantity,
        req.cookies.sessionId,
        req.user?.id,
      );
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
