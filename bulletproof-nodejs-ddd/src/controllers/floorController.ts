import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';

import IFloorController from './IControllers/IFloorController';
import IFloorService from '../services/IServices/IFloorService';
import IFloorDTO from '../dto/IFloorDTO';
import { Result } from '../core/logic/Result';

@Service()
export default class FloorController implements IFloorController {
  constructor(@Inject(config.services.floor.name) private floorServiceInstance: IFloorService) {}

  public async createFloor(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const floorDTO = req.body as IFloorDTO;
      const result = await this.floorServiceInstance.createFloor(floorDTO);

      if (result.isSuccess) {
        res.status(201).json(result.getValue());
      } else {
        res.status(400).json({ error: 'Bad Request', message: result.error });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

}
