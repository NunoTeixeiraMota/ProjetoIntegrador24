import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';

import BuildingService from '../../services/buildingsService'; 

import winston = require('winston');


const floorController = require('../../controllers/floorController'); 

const route = Router();

export default (app: Router) => {
  app.use('/building', route);

  // Create a route to get a specific floor of a building
  route.get(
    '/floor/:buildingId/:floorNumber',
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;
      const { buildingId, floorNumber } = req.params; // Get the building ID and floor number from the request parameters

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

  // Add more routes for other floor-related operations as needed

  app.use('/buildings', route);

  // Add routes for other building-related operations, similar to the example above.

  // Example: route.post('/update/:id', building_controller.updateBuildingById);
};
