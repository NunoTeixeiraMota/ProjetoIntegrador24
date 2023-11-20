import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';
import ILiftController from '../../controllers/IControllers/ILiftController';
import config from '../../../config';

const route = Router();

export default (app: Router) => {
  app.use('/lift', route);

  const ctrl = Container.get(config.controllers.lift.name) as ILiftController;
  route.post(
    '/create',
    celebrate({
      body: Joi.object({
        localization: Joi.string().required(),
        state: Joi.string().required(),
        building: Joi.object({
          id: Joi.string().required(),
          name: Joi.string().required(),
          localizationoncampus: Joi.string().required(),
          floors: Joi.number().required(),
          lifts: Joi.number().required(),
          maxCel: Joi.array().items(Joi.number().required()).required(),
      })
      }),
    }),
    (req, res, next) => ctrl.createLift(req, res, next)
  );
}