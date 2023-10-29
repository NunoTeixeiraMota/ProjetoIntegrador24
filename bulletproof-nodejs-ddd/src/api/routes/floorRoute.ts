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
