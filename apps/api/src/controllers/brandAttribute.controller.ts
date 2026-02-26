import { Request, Response, NextFunction } from 'express';
import { BrandAttributeService } from '@/services/brandAttribute.service';

const brandService = new BrandAttributeService();

export class BrandAttribute {
  async createNewBrand(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await brandService.createBrand(req.body);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async createNewAttribute(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await brandService.createAttribute(req.body);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async addNewAttributeValue(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await brandService.addAttributeValue(req.body);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async createNewTag(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await brandService.createTag(req.body);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
