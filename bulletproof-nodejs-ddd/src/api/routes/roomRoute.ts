import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';

import BuildingService from '../../services/buildingsService';
import { IBuildingDTO } from '../../dto/IBuildingDTO';

import { celebrate, Joi } from 'celebrate';
import winston = require('winston');
import roomService from '../../services/roomService';
import IRoomDTO from '../../dto/IRoomDTO';

const route = Router();

export default (app: Router) => {
  app.use('/room', route);

  route.post(
    '/createRoom',
    celebrate({
      body: Joi.object({
          id: Joi.string().required(),
          building: Joi.object({
              id: Joi.string().required(),
              localizationoncampus: Joi.string().required(),
              floors: Joi.number().required(),
              lifts: Joi.number().required(),
              maxCel: Joi.array().items(Joi.number().required()).required(),
              floorOnBuilding: Joi.object({
                  id: Joi.string().required(),
                  name: Joi.string().required(),
                  description: Joi.string().required(),
                  hall: Joi.string().required(),
                  room: Joi.number().required(),
                  floorMap: Joi.string().required(),
                  hasElevator: Joi.boolean().required(),
              }),
          }),
          floor: Joi.object({
              id: Joi.string().required(),
              name: Joi.string().required(),
              description: Joi.string().required(),
              hall: Joi.string().required(),
              room: Joi.number().required(),
              floorMap: Joi.string().required(),
              hasElevator: Joi.boolean().required(),
          }),
          name: Joi.string().required(),
          category: Joi.string().required(),
          description: Joi.string().required(),
          dimension: Joi.array().items(Joi.number().required()).required(),
      }),
  });
  async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get('logger') as winston.Logger;

    try {
      const roomServiceInstance = Container.get(roomService);
      const roomOrError = await roomServiceInstance.createRoom(req.body as IRoomDTO);

      if (roomOrError.isFailure) {
        logger.debug(roomOrError.errorValue());
        return res.status(400).send(roomOrError.errorValue());
      }

      const buildingDTO = roomOrError.getValue();

      return res.status(201).json(buildingDTO);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  }
  );

  app.use('/buildings', route);
};
