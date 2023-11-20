import { Router} from 'express';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';
import IFloorController from '../../controllers/IControllers/IFloorController';
import config from '../../../config';

const route = Router();

export default (app: Router) => {
  app.use('/floor', route);

  const ctrl = Container.get(config.controllers.floor.name) as IFloorController
    route.post(
        '/create',
        celebrate({
            body: Joi.object({
                id: Joi.string().required(),
                building: Joi.string().required(),
                name: Joi.string().required(),
                description: Joi.string().required(),
                hall: Joi.string().required(),
                room: Joi.number().required(),
                floorMap: Joi.string().required(),
                hasElevator: Joi.boolean().required(),
                passages: Joi.array().items(Joi.string())
            }),
        }), (req, res, next) => ctrl.createFloor(req, res, next));

  route.put(
    '/updateFloor',
    celebrate({
        body: Joi.object({
            id: Joi.string().required(),
            building: Joi.string().required(),
            name: Joi.string().required(),
            description: Joi.string().required(),
            hall: Joi.string().required(),
            room: Joi.number().required(),
            floorMap: Joi.string().required(),
            hasElevator: Joi.boolean().required(),
            passages: Joi.array().items(Joi.string())
        }),
    }), (req, res, next) => ctrl.updateFloor(req, res, next));

  route.patch(
    '/patchFloorMap',
    celebrate({
        body: Joi.object({
            id: Joi.string().required(),
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