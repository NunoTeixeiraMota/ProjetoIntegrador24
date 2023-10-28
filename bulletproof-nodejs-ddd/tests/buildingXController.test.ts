import 'reflect-metadata';
import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import IBuildingDTO from '../src/dto/IBuildingDTO';
import { Result } from '../src/core/logic/Result';
import BuildingsController from '../src/controllers/buildingsController';
import IBuildingService from '../src/services/IServices/IBuildingsService';
import {Building} from '../src/domain/building';

import { FloorId } from '../src/domain/floorId';
import { Floor } from '../src/domain/floor';


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

      const FloorRepoClass = require("../src/repos/floorRepo").default;
      const FloorRepoInstance = new FloorRepoClass(); // Instantiate the repo if necessary
      Container.set("FloorRepo", FloorRepoInstance);
    });
    afterEach(function() {
      sandbox.restore();
    });

    it('createBuilding: returns JSON with id+name values', async function () {
      let floorIds: FloorId[] = [new FloorId(1), new FloorId(2), new FloorId(3)]; // Populate this array with your actual FloorId instances
      const body = {
          "id": "123",
          "name": "Building 123", // Make sure 'name' is defined
          "localizationoncampus": "Campus XYZ",
          "floors": 5,
          "lifts": 2,
          "maxCel": [1,2],
          "FloorIds": floorIds
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
        "maxCel": req.body.maxCel,
        "floorIds": floorIds,
      };
  
      sinon.stub(buildingServiceInstance, "createBuilding").returns( Result.ok<IBuildingDTO>( {
        "id": req.body.id,
        "name": req.body.name,
        "localizationoncampus": req.body.localizationoncampus,
        "floors": req.body.floors,
        "lifts": req.body.lifts,
        "maxCel": req.body.maxCel,
        "floorIds": floorIds,
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
  it('listBuildingsByFloors: returns an array of buildings within the specified range of floors', async function () {
    const minFloors = 1;
    const maxFloors = 5;
    let floorIdss: FloorId[] = [new FloorId(1), new FloorId(2), new FloorId(3)]; // Populate this array with your actual FloorId instances
    const req: Partial<Request> = {
      query: {
        minFloors: minFloors.toString(),
        maxFloors: maxFloors.toString(),
      },
    };

    const buildingList = [
      {
        id: '1',
        name: 'Building 1',
        localizationoncampus: 'Campus XYZ',
        floors: 3,
        lifts: 2,
        maxCel: '[1,2]',
        floorIds: floorIdss,
      },
      {
        id: '2',
        name: 'Building 2',
        localizationoncampus: 'Campus ABC',
        floors: 4,
        lifts: 3,
        maxCel: '[1,2]',
        floorIds: floorIdss,
      },
    ];

    const res: Partial<Response> = {
      json: sinon.spy(),
    };

    const next: Partial<NextFunction> = () => {};

    // Mock the building service
    const buildingServiceInstance = Container.get('BuildingsService');

    // Stub the listBuildingsByFloors method to return the predefined building list
    sinon.stub(buildingServiceInstance, 'listBuildingsByFloors').resolves(buildingList);

    const ctrl = new BuildingsController(buildingServiceInstance as IBuildingService);

    await ctrl.listBuildingsByFloors(<Request>req, <Response>res, <NextFunction>next);

    // Assertions
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, buildingList);
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
    const buildingServiceInstance = Container.get('BuildingsService');

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

