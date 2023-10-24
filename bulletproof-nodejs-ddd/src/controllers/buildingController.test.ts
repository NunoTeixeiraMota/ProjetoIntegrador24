import 'reflect-metadata';
import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import IBuildingService from "../services/IServices/IBuildingsService";
import BuildingsController from "./buildingsController";
import IBuildingDTO from '../dto/IBuildingDTO';
import config from '../../config';

describe('BuildingsController', function () {
  beforeEach(function() {
  });

  it('createBuilding: returns JSON with id+name values', async function () {
    const body = {
      "id": "123",
      "name": "Building 123",
      "localizationoncampus": "Campus XYZ",
      "floors": 5,
      "lifts": 2
    };

    const req: Partial<Request> = {};
    req.body = body;

    const res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
    };
    
    const next: Partial<NextFunction> = () => {};

    // Mock the building service
    const buildingServiceClass = require(config.services.buildings.path).default;
    const buildingServiceInstance = Container.get(buildingServiceClass);
    Container.set(config.services.buildings.name, buildingServiceInstance);

    // Stub the createBuilding method to return a predefined result
    const expectedResult: IBuildingDTO = {
      "id": req.body.id,
      "name": req.body.name,
      "localizationoncampus": req.body.localizationoncampus,
      "floors": req.body.floors,
      "lifts": req.body.lifts,
    };

    sinon.stub(buildingServiceInstance, "createBuilding").returns(Promise.resolve(expectedResult));

    const ctrl = new BuildingsController(buildingServiceInstance as IBuildingService);

    await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next);

    // Assertions
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match(expectedResult));
  });
});
