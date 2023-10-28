import 'reflect-metadata';
import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import IFloorDTO from '../src/dto/IFloorDTO';
import { Result } from '../src/core/logic/Result';
import FloorController from '../src/controllers/floorController';
import IFloorService from '../src/services/IServices/IFloorService';


describe('FloorController (Unit Test)', function () {
  const sandbox = sinon.createSandbox();

  beforeEach(function () {
    Container.reset();
    const floorSchemaInstance = require("../src/persistence/schemas/floorSchema").default;
    Container.set("FloorSchema", floorSchemaInstance);

    const floorRepoClass = require("../src/repos/floorRepo").default;
    const floorRepoInstance = new floorRepoClass(); 
    Container.set("FloorRepo", floorRepoInstance);

    const floorServiceClass = require("../src/services/floorService").default;
    const floorServiceInstance = new floorServiceClass(); 
    Container.set("FloorService", floorServiceInstance);
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('createFloor: returns JSON with floor data', async function () {
    const floorData = {
        "id": "123",
        "name": "Floor 123",
        "description": "Welcome to floor 123",
        "hall": "dadad",
        "room": 4,
        "floorMap": "dasdada",
        "hasElevator":true
    };

    const req: Partial<Request> = {};
    req.body = floorData;
    const res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
    };
    const next: Partial<NextFunction> = () => {};
    const floorServiceInstance = Container.get("FloorService");

    const expectedResult : IFloorDTO = {
        "id" : req.body.id,
        "name" : req.body.name,
        "description" : req.body.description,
        "hall" : req.body.hall,
        "room" : req.body.room,
        "floorMap" : req.body.floorMap,
        "hasElevator" : req.body.hasElevator,
    }

    sinon.stub(floorServiceInstance, "createFloor").returns(Result.ok(expectedResult));
    const ctrl = new FloorController(floorServiceInstance as IFloorService);
    await ctrl.createFloor(<Request>req, <Response>res, <NextFunction>next);

    // Assertions
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match(expectedResult));
  });

  it('updateFloor: returns JSON with updated floor data', async function () {
    const floorData = {
      "id": "123",
      "name": "Floor 123",
      "description": "Welcome",
      "hall": "dadad",
      "room": 4,
      "floorMap": "dasdada",
      "hasElevator": true
    };
  
    const updatedFloorData = {
      "id": "123",
      "name": "Floor 123",
      "description": "Welcome to LIDL",
      "hall": "hall",
      "room": 5,
      "floorMap": "aaaaaaaaa",
      "hasElevator": false
    };
  
    const req: Partial<Request> = {};
    req.body = floorData;
  
    const res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
    };
  
    const next: Partial<NextFunction> = () => {};
    const floorServiceInstance = Container.get("FloorService");
    sinon.stub(floorServiceInstance, "updateFloor").returns(Result.ok(updatedFloorData));
  
    const ctrl = new FloorController(floorServiceInstance as IFloorService);
    await ctrl.updateFloor(<Request>req, <Response>res, <NextFunction>next);
  
    // Assertions
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match(updatedFloorData));
  });
});