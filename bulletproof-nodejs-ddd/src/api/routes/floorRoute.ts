import { Router } from 'express';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';
import IFloorController from '../../controllers/IControllers/IFloorController';
import config from '../../../config';
import multer from 'multer';
import path from 'path';
import { checkRole } from '../middlewares/isTokenRoleValid'; // adjust the path accordingly

const storage = multer.diskStorage({
  destination: 'flormaps/', // Your destination folder
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const originalExt = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + originalExt);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/json') {
    cb(null, true);
  } else {
    cb(new Error('Only JSON files are allowed!'), false);
  }
};


const upload = multer({
  storage: storage,
  fileFilter: fileFilter // Apply the file filter
});


const route = Router();

export default (app: Router) => {
  app.use('/floor', route);

  const ctrl = Container.get(config.controllers.floor.name) as IFloorController
  route.post(
    '/create',
    celebrate({
      body: Joi.object({
        building: Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string().required(),
        hall: Joi.string().required(),
        room: Joi.number().required(),
        floorMap: Joi.string().required(),
        hasElevator: Joi.boolean().required(),
        passages: Joi.array().items(Joi.string())
      }),
    }), checkRole(['ROLE_ADMIN','ROLE_USER','ROLE_MANAGER']), (req, res, next) => ctrl.createFloor(req, res, next));

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
    }), checkRole(['ROLE_ADMIN','ROLE_MANAGER']), (req, res, next) => ctrl.updateFloor(req, res, next));

  route.patch(
    '/patchFloorMap',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        floorMap: Joi.string().required(),
      }),
    }), checkRole(['ROLE_ADMIN','ROLE_MANAGER']), (req, res, next) => ctrl.patchFloorMap(req, res, next));


  route.patch(
    '/patchPassageBuildings',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        passages: Joi.array().items(Joi.string().required()).required()
      }),
    }), checkRole(['ROLE_ADMIN','ROLE_MANAGER']), (req, res, next) => ctrl.patchPassageBuilding(req, res, next));

  route.patch(
    '/uploadmap',
    upload.single('file'), checkRole(['ROLE_ADMIN','ROLE_MANAGER']),
    (req, res, next) => {
      if (!req.file) {
        return res.status(400).send('No file uploaded.');
      }
      return res.status(200).send(req.file.filename);
    })

  route.post(
    '/listBuildingsByFloors',
    celebrate({
      body: Joi.object({
        buildingId: Joi.string().required(),
      }),
    }), checkRole(['ROLE_USER','ROLE_ADMIN','ROLE_MANAGER']),
    (req, res, next) => ctrl.listAllFloorsInBuilding(req, res, next));

  route.get(
    '/list',
    celebrate({
      body: Joi.object({
        value: Joi.object().optional(),
      }),
    }), (req, res, next) => ctrl.listAllFloors(req, res, next));
}