import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';

import BuildingService from '../../services/buildingService'; // Import your BuildingService
import { IBuildingDTO } from '../../dto/IBuildingDTO'; // Import your BuildingDTO

import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import winston = require('winston');

const buildingController = require('../../controllers/buildingController'); // Import your BuildingController

const route = Router();

export default (app: Router) => {
  app.use('/building', route);

  route.post(
    '/create',
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        localizationoncampus: Joi.string().required(),
        floors: Joi.number().required(),
        lifts: Joi.number().required(),
        // Add more validation rules as needed
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;
      logger.debug('Calling Create Building endpoint with body: %o', req.body);

      try {
        const buildingServiceInstance = Container.get(BuildingService);
        const buildingOrError = await buildingServiceInstance.createBuilding(req.body as IBuildingDTO);

        if (buildingOrError.isFailure) {
          logger.debug(buildingOrError.errorValue());
          return res.status(400).send(buildingOrError.errorValue());
        }

        const buildingDTO = buildingOrError.getValue();

        return res.status(201).json(buildingDTO);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    }
  );

  // Add more routes for building-related operations as needed

  app.use('/buildings', route);

  // Add routes for other building-related operations, similar to the example above.

  // Example: route.get('/get/:id', building_controller.getBuildingById);
};
