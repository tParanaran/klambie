import { Request, Response, NextFunction } from 'express';
import { AttributeService } from '@/services/attribute.service';

const attributeService = new AttributeService();

export class Attribute {
  async createNewBrand(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await attributeService.createBrand(req.body);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async updateBrand(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await attributeService.updateBrand({
        data: req.body,
        slug: req.params.slug,
      });

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async createNewAttribute(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await attributeService.createAttribute(req.body);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async createNewAttributeValue(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await attributeService.createAttributeValue(req.body);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async updateAttributeValue(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await attributeService.updateAttributeValue({
        data: req.body,
        slug: req.params.slug,
      });

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async createNewTag(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await attributeService.createTag(req.body);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async fetchTag(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await attributeService.fetchTag();

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async createNewCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await attributeService.generateCategoryHierarchy(req.body);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
