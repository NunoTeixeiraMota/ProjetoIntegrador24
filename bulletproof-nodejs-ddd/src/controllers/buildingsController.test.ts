import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import config from "../../config";
import { Result } from '../core/logic/Result';
import IBuildingDTO from '../dto/IBuildingDTO';
import BuildingsController from './buildingsController';
import IBuildingService from '../services/IServices/IBuildingsService';
import buildingService from '../services/buildingsService';

describe('BuildingsController (Integration Test)', function () {
    beforeEach(function () {
        const buildingServiceName = config.services.buildings.name;
        const buildingRepoName = config.repos.name;

        const buildingServiceClass = require(config.services.buildings.path).default;
        const buildingRepoClass = require(config.repos.buildings.path).default;

        Container.set(buildingServiceName, new buildingServiceClass());
        Container.set(buildingRepoName, new buildingRepoClass());
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
        const buildingServiceInstance = Container.get(buildingService);
    
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
        const buildingServiceClass = require(config.services.buildings.path).default;
        const buildingServiceInstance = new buildingServiceClass();
        Container.set(config.services.buildings.name, buildingServiceInstance);

        // Stub the findAll method to return predefined result
        sinon.stub(buildingServiceInstance, 'findAll').resolves(buildingNames);

        const ctrl = new BuildingsController(buildingServiceInstance as IBuildingService);
        await ctrl.findAll(<Request>req, <Response>res, <NextFunction>next);

        // Assertions
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, buildingNames);
    });
});
