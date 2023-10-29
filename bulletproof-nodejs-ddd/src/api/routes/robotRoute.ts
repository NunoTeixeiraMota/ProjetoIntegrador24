import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';
import winston = require('winston');
import IRobotController from '../../controllers/IControllers/IRobotController';
import config from '../../../config';

const route = Router();

export default (app: Router) => {
  app.use('/robot', route);

  const ctrl = Container.get(config.controllers.robot.name) as IRobotController

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
      }), (req,res,next) => ctrl.addRobot(req,res,next));

  route.post(
    '/createRobot',
        celebrate({
          body: Joi.object({
            id: Joi.string().required(),
            designation: Joi.string().required(),
            brand: Joi.string().required(),
            model: Joi.string().required(),
            task: Joi.number().required()
          }),
        }),(req,res,next) => ctrl.createRobotType(req,res,next));
};