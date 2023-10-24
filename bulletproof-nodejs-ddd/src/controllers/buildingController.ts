import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';

import IBuildingsController from './IControllers/IBuildingsController'; // Define this interface
import IBuildingsService from '../services/IServices/IBuildingsService'; // Define this interface
import IBuildingDTO from '../dto/IBuildingDTO'; // Define this DTO

import { Result } from '../core/logic/Result';

@Service()
export default class BuildingsController implements IBuildingsController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
    @Inject(config.services.buildings.name) private buildingsServiceInstance: IBuildingsService
  ) {}

  public async createBuilding(req: Request, res: Response, next: NextFunction) {
    try {
      const buildingOrError = await this.buildingsServiceInstance.createBuilding(req.body as IBuildingDTO) as Result<IBuildingDTO>;

      if (buildingOrError.isFailure) {
        return res.status(402).send();
      }

      const buildingDTO = buildingOrError.getValue();
      return res.status(201).json(buildingDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async updateBuilding(req: Request, res: Response, next: NextFunction) {
    try {
      const buildingOrError = await this.buildingsServiceInstance.updateBuilding(req.body as IBuildingDTO) as Result<IBuildingDTO>;

      if (buildingOrError.isFailure) {
        return res.status(404).send();
      }

      const buildingDTO = buildingOrError.getValue();
      return res.status(200).json(buildingDTO);
    } catch (e) {
      return next(e);
    }
  }
}

