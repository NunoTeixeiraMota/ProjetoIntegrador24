import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';
import winston = require('winston');
import robotService from '../../services/robotService';
import IRobotDTO from '../../dto/IRobotDTO';

const route = Router();

export default (app: Router) => {
  app.use('/robot', route);

  route.post(
    '/addRobot',
    celebrate({
        body: Joi.object({
          id: Joi.string().required(),
          nickname: Joi.string().required(),
          type: Joi.object({id: Joi.string().required(),
                            designation: Joi.string().required(),
                            brand: Joi.string().required(),
                            model: Joi.string().required(),
                            task: Joi.string().required()
                        }),
          serialNumber: Joi.string().required(),
          description: Joi.string().required(),
        }),
      }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;
      logger.debug('Calling Create RobotType endpoint with body: %o', req.body);

      try {
        const robotServiceInstance = Container.get(robotService);
        const robotOrError = await robotServiceInstance.addRobot(req.body as IRobotDTO);

        if (robotOrError.isFailure) {
          logger.debug(robotOrError.errorValue());
          return res.status(400).send(robotOrError.errorValue());
        }

        const robotDTO = robotOrError.getValue();

        return res.status(201).json(robotDTO);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    }
  );
  app.use('/robot', route);
};