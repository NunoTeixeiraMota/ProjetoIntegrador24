import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import winston = require('winston');
import IFloorDTO from '../../dto/IFloorDTO';
import FloorService from '../../services/floorService';
import IFloorController from '../../controllers/IControllers/IFloorController';
import config from '../../../config';
import { Joi, celebrate } from 'celebrate';

const route = Router();

export default (app: Router) => {
  app.use('/building', route);

  const ctrl = Container.get(config.controllers.floor.name) as IFloorController

  route.patch(
    '/patchFloorMap',
    celebrate({
        body: Joi.object({
            id: Joi.string.required(),
            floorMap: Joi.string().required(),
        }),
    }), (req, res, next) => ctrl.patchFloorMap(req, res, next));


    route.patch(
      '/patchPassageBuildings',
      celebrate({
          body: Joi.object({
              id: Joi.string().required(),
              passages: Joi.array().items(Joi.object({
                  id: Joi.string().required(),
                  name: Joi.string().required(),
                  description: Joi.string().required(),
                  hall: Joi.string().required(),
                  room: Joi.number().required(),
                  floorMap: Joi.string().required(),
                  hasElevator: Joi.boolean().required()
              })).required()
          }),
      }), (req, res, next) => ctrl.patchPassageBuilding(req, res, next));
};