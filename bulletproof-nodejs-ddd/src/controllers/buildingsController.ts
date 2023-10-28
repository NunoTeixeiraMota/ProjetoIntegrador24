import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';

import IBuildingsController from './IControllers/IBuildingsController'; // Define this interface
import IBuildingsService from '../services/IServices/IBuildingsService'; // Define this interface
import IBuildingDTO from '../dto/IBuildingDTO'; // Define this DTO

import { Result } from '../core/logic/Result';

@Service()
export default class BuildingsController implements IBuildingsController {
  constructor(
    @Inject(config.services.buildings.name) private buildingsServiceInstance: IBuildingsService

  ) {}

  public async createBuilding(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const buildingOrError = await this.buildingsServiceInstance.createBuilding(req.body as IBuildingDTO) as Result<IBuildingDTO>;

      if (buildingOrError.isFailure) {
        res.status(402).send();
      } else {
        const buildingDTO = buildingOrError.getValue();
        res.status(201).json(buildingDTO);
      }
    } catch (e) {
      next(e);
    }
  }

  public async updateBuilding(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const buildingOrError = await this.buildingsServiceInstance.updateBuilding(req.body as IBuildingDTO) as Result<IBuildingDTO>;

      if (buildingOrError.isFailure) {
        res.status(404).send();
      } else {
        const buildingDTO = buildingOrError.getValue();
        res.status(200).json(buildingDTO);
      }
    } catch (e) {
      next(e);
    }
  }
  public async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const buildingNames = await this.buildingsServiceInstance.findAll();
      res.json(buildingNames);
    } catch (e) {
      res.status(500).json({ error: 'Internal Server Error' });
      next(e);
    }
  }

  public async listBuildingsByFloors(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const minFloors = parseInt(req.query.minFloors as string, 10);
      const maxFloors = parseInt(req.query.maxFloors as string, 10);
  
      if (isNaN(minFloors) || isNaN(maxFloors)) {
        res.status(400).json({ error: 'Invalid input for minFloors and maxFloors.' });
        return;
      }
  
      const buildingList = await this.buildingsServiceInstance.listBuildingsByFloors(minFloors, maxFloors);
  
      if (buildingList.length === 0) {
        res.status(404).json({ error: 'No buildings found within the specified range of floors.' });
      } else {
        res.status(200).json(buildingList);
      }
    } catch (e) {
      res.status(500).json({ error: 'Internal Server Error' });
      next(e);
    }
  }
  async listAllFloorsInBuilding(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const buildingId = req.params.buildingId;

            if (!buildingId) {
                res.status(400).json({ error: 'Building ID is missing.' });
                return;
            }
            const floors = await this.buildingsServiceInstance.getAllFloorsInBuilding(buildingId);
            if (!floors || floors.length === 0) {
                res.status(404).json({ error: 'No floors found for the building ID provided.' });
            } else {
                res.status(200).json(floors);
            }
        } catch (err) {
            res.status(500).json({ error: 'Internal Server Error' });
            next(err);
        }
    }
}

  

