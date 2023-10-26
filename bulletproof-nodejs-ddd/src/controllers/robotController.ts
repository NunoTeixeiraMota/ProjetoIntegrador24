import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';
import { Result } from '../core/logic/Result';

import IRobotController from './IControllers/IRobotController';
import RobotService from '../services/IServices/IRobotService';
import IRobotTypeDTO from '../dto/IRobotTypeDTO';

@Service()
export default class robotController implements IRobotController {
  constructor(
    @Inject(config.services.robotType.name) private robotService: RobotService
  ) {}

  public async createRobotType(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const robotTypeOrError = await this.robotService.createRobotType(req.body as IRobotTypeDTO) as Result<IRobotTypeDTO>;

      if (robotTypeOrError.isFailure) {
        res.status(402).send();
      } else {
        const robotTypeDTO = robotTypeOrError.getValue();
        res.status(201).json(robotTypeDTO);
      }
    } catch (e) {
      next(e);
    }
  }
}