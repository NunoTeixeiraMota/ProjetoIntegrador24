import 'reflect-metadata';
import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import IBuildingDTO from '../src/dto/IBuildingDTO';
import { Result } from '../src/core/logic/Result';
import BuildingsController from '../src/controllers/buildingsController';
import IBuildingService from '../src/services/IServices/IBuildingsService';


describe('BuildingsController (Unit Test)', function () {
  const sandbox = sinon.createSandbox();

    beforeEach(function() {
      Container.reset();
      const buildSchemaInstance = require("../src/persistence/schemas/buildingsSchema").default;
      Container.set("BuildingsSchema", buildSchemaInstance);

      const buildRepoClass = require("../src/repos/buildingsRepo").default;
      const buildingRepoInstance = new buildRepoClass(); // Instantiate the repo if necessary
      Container.set("BuildingsRepo", buildingRepoInstance);

      const buildingsServiceClass = require("../src/services/buildingsService").default;
      const buildingsServiceInstance = new buildingsServiceClass(); // Instantiate the service if necessary
      Container.set("BuildingsService", buildingsServiceInstance);
    });
    afterEach(function() {
      sandbox.restore();
    });

    it('createBuilding: returns JSON with id+name values', async function () {
      const body = {
        "id": "123",
        "name": "Building 123", // Make sure 'name' is defined
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
      const buildingServiceInstance = Container.get("BuildingsService");
  
      // Stub the createBuilding method to return a predefined result
      const expectedResult: IBuildingDTO = {
        "id": req.body.id,
        "name": req.body.name,
        "localizationoncampus": req.body.localizationoncampus,
        "floors": req.body.floors,
        "lifts": req.body.lifts,
      };
  
      sinon.stub(buildingServiceInstance, "createBuilding").returns( Result.ok<IBuildingDTO>( {
          "id": req.body.id,
          "name": req.body.name,
          "localizationoncampus": req.body.localizationoncampus,
          "floors": req.body.floors,
          "lifts": req.body.lifts,
      }));
  
      const ctrl = new BuildingsController(buildingServiceInstance as IBuildingService);
  
      await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next);
  
      // Assertions
      sinon.assert.calledOnce(res.json);
      sinon.assert.calledWith(res.json, sinon.match(expectedResult));
    });
    it('findAll: returns an array of building names', async function () {
      const buildingNames = ['Building 1', 'Building 2'];

      const req: Partial<Request> = {};
      const res: Partial<Response> = {
          json: sinon.spy(),
      };
      const next: Partial<NextFunction> = () => {};

      // Mock the building service
      const buildingServiceInstance = Container.get('BuildingsService');

      // Stub the findAll method to return predefined result
      sinon.stub(buildingServiceInstance, 'findAll').resolves(buildingNames);

      const ctrl = new BuildingsController(buildingServiceInstance as IBuildingService);
      await ctrl.findAll(<Request>req, <Response>res, <NextFunction>next);

      // Assertions
      sinon.assert.calledOnce(res.json);
      sinon.assert.calledWith(res.json, buildingNames);
  });
  
});

