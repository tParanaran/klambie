import { PromotionService } from '@/services/promotion.service';
import { Request, Response, NextFunction } from 'express';

const promoService = new PromotionService();

export class Promotion {
  async createNewPromotion(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await promoService.createPromotion(req.body);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async deactivePromotion(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await promoService.deactivePromotion(req.params.id);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
