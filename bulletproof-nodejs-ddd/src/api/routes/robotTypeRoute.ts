import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';
import winston = require('winston');
import robotService from '../../services/robotService';
import IRobotTypeDTO from '../../dto/IRobotTypeDTO';

const route = Router();

export default (app: Router) => {
  app.use('/robotType', route);

  route.post(
    '/create',
    celebrate({
      body: Joi.object({
        designation: Joi.string().required(),
        brand: Joi.string().required(),
        model: Joi.string().required(),
        task: Joi.number().required()
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;
      logger.debug('Calling Create RobotType endpoint with body: %o', req.body);

      try {
        const robotServiceInstance = Container.get(robotService);
        const robotTypeOrError = await robotServiceInstance.createRobotType(req.body as IRobotTypeDTO);

        if (robotTypeOrError.isFailure) {
          logger.debug(robotTypeOrError.errorValue());
          return res.status(400).send(robotTypeOrError.errorValue());
        }

        const robotTypeDTO = robotTypeOrError.getValue();

        return res.status(201).json(robotTypeDTO);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    }
  );
  app.use('/robotType', route);
};