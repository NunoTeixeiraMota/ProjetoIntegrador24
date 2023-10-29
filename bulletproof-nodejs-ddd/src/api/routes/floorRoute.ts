import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';

import BuildingService from '../../services/buildingsService'; 

import winston = require('winston');
import IFloorDTO from '../../dto/IFloorDTO';
import FloorService from '../../services/floorService';


const floorController = require('../../controllers/floorController'); 

const route = Router();

export default (app: Router) => {
  app.use('/building', route);

  route.get(
    '/floor/:buildingId/:floorNumber',
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;
      const { buildingId, floorNumber } = req.params;

      try {
        const buildingServiceInstance = Container.get(BuildingService);
        const floorOrError = await buildingServiceInstance.getFloorByNumber(buildingId, floorNumber);

        if (floorOrError.isFailure) {
          logger.debug(floorOrError.errorValue());
          return res.status(400).send(floorOrError.errorValue());
        }

        const floorDTO = floorOrError.getValue();

        return res.status(200).json(floorDTO);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    }
  );

  route.patch(
    '/floorMap/:floorId/:floorUpdates',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { floorId, floorUpdates } = req.params;
        const updates: Partial<IFloorDTO> = req.body;
  
        const floorServiceInstance = Container.get(FloorService);
        const result = await floorServiceInstance.patchFloorMap(floorId, updates);
  
        if (result.isSuccess) {
          return res.status(200).json(result.getValue());
        } else {
          return res.status(400).json({ error: 'Bad Request', message: result.error });
        }
      } catch (error) {
        console.error(error);
        return next(error);
      }
    }
  );

  route.patch(
    '/floorPassages/:floorId/:floorUpdates',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { floorId, floorUpdates } = req.params;
        const updates: Partial<IFloorDTO> = req.body;
  
        const floorServiceInstance = Container.get(FloorService);
        const result = await floorServiceInstance.patchPassageBuilding(floorId, updates);
  
        if (result.isSuccess) {
          return res.status(200).json(result.getValue());
        } else {
          return res.status(400).json({ error: 'Bad Request', message: result.error });
        }
      } catch (error) {
        console.error(error);
        return next(error);
      }
    }
  );
  app.use('/buildings', route);
};
