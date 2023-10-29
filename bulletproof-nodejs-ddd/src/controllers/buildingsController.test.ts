import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import config from "../../config";
import { Result } from '../core/logic/Result';
import IBuildingDTO from '../dto/IBuildingDTO';
import BuildingsController from './buildingsController';
import IBuildingService from '../services/IServices/IBuildingsService';
import buildingService from '../services/buildingsService';
import { Floor } from '../domain/floor';
import IFloorDTO from '../dto/IFloorDTO';
import { FloorMap } from '../mappers/FloorMap';

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
      const floorDataPassage: IFloorDTO = {
        "id": "456",
        "name": "Floor 456",
        "description": "This floor offers a beautiful view of the city skyline.",
        "hall": "Main Hall",
        "room": 8,
        "floorMap": "dasdasd",
        "hasElevator": false,
        "passages": []
      };
    
      // Assume FloorMap.toDomain converts IFloorDTO to the domain object
      const FloorPassaDomain =  FloorMap.toDomain(floorDataPassage);
      const FloorArray = [FloorPassaDomain];
      const body = {
          "id": "123",
          "name": "Building 123", // Make sure 'name' is defined
          "localizationoncampus": "Campus XYZ",
          "floors": 5,
          "lifts": 2,
          "maxCel": [1,2],
          "floorOnBuilding": FloorArray
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
          "maxCel": req.body.maxCel,
          "floorOnBuilding": FloorArray,
        };
    
        sinon.stub(buildingServiceInstance, "createBuilding").returns( Result.ok<IBuildingDTO>( {
            "id": req.body.id,
            "name": req.body.name,
            "localizationoncampus": req.body.localizationoncampus,
            "floors": req.body.floors,
            "lifts": req.body.lifts,
            "maxCel": req.body.maxCel,
            "floorOnBuilding": FloorArray,
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

    it('getAllFloorsInBuilding: returns an array of floors for a specific building ID', async function () {
      const buildingId = '123'; // Use a specific building ID
      const floorsForBuilding = [
        { id: '1', name: 'Floor 1' },
        { id: '2', name: 'Floor 2' },
      ];
    
      const req: Partial<Request> = {
        params: { buildingId },
      };
    
      const res: Partial<Response> = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
      };
    
      const next: Partial<NextFunction> = () => {};
    
      // Mock the building service
      const buildingServiceInstance = Container.get(config.services.buildings.name);
      // Stub the getAllFloorsInBuilding method to return the predefined array of floors
      sinon.stub(buildingServiceInstance, 'getAllFloorsInBuilding').resolves(floorsForBuilding);
    
      const ctrl = new BuildingsController(buildingServiceInstance as IBuildingService);
    
      await ctrl.listAllFloorsInBuilding(<Request>req, <Response>res, <NextFunction>next);
    
      // Assertions
      sinon.assert.calledOnce(res.json);
      sinon.assert.calledWith(res.json, floorsForBuilding);
    
      // Specific assertions
      sinon.assert.calledWith(res.json, sinon.match.array); // Ensure it returns an array
      sinon.assert.calledWith(res.json, sinon.match.has('length', floorsForBuilding.length)); // Check if the correct number of floors is returned
    
      // Check specific floor properties
      sinon.assert.calledWithMatch(res.json, [
        sinon.match({ id: '1', name: 'Floor 1' }),
        sinon.match({ id: '2', name: 'Floor 2' }),
      ]);
    });
    
});
