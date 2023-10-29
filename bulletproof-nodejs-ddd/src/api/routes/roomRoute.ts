import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';

import BuildingService from '../../services/buildingsService';
import { IBuildingDTO } from '../../dto/IBuildingDTO';

import { celebrate, Joi } from 'celebrate';
import winston = require('winston');

const buildingController = require('../../controllers/buildingController');

const route = Router();

export default (app: Router) => {
  app.use('/room', route);

  route.post(
    '/create',
    celebrate({
        body: Joi.object({
        name: Joi.string().required(),
        localizationoncampus: Joi.string().required(),
        floors: Joi.number().required(),
        lifts: Joi.number().required()
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
  app.use('/buildings', route);
};
