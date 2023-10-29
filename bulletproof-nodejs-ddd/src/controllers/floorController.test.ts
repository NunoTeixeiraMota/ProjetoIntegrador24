import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import config from '../../config';
import FloorController from '../controllers/floorController';
import IFloorService from '../services/IServices/IFloorService';
import { Result } from '../core/logic/Result';
import FloorService from '../services/floorService';
import IFloorDTO from '../dto/IFloorDTO';
import { Floor } from '../domain/floor';
import { FloorMap } from '../mappers/FloorMap';

describe('FloorController (Integration Test)', function () {
  beforeEach(function () {
    const floorRepoName = config.repos.floor.name;
    const floorServiceName = config.services.floor.name;

    const floorServiceClass = require(config.services.floor.path).default;
    const floorRepoClass = require(config.repos.floor.path).default;

    Container.set(floorServiceName, new floorServiceClass());
    Container.set(floorRepoName, new floorServiceClass());
    Container.set(floorRepoClass, new floorRepoClass());
  });

  it('createFloor: returns JSON with floor data', async function () {
    const floorData = {
      "id": "123",
      "name": "Floor 123",
      "description": "Welcome to floor 123",
      "hall": "dadad",
      "room": 4,
      "floorMap": "dasdada",
      "hasElevator":"true",
      "passages": "[]"
    };

    const req: Partial<Request> = {};
    req.body = floorData;
    const res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
    };
    const next: Partial<NextFunction> = () => {};

   
    const floorServiceInstance = Container.get(FloorService);


    const expectedResult: IFloorDTO = {
      "id": req.body.id,
      "name": req.body.name,
      "description": req.body.description,
      "hall": req.body.hall,
      "room": req.body.room,
      "floorMap": req.body.floorMap,
      "hasElevator": req.body.hasElevator,
      "passages": req.body.passages
    } 

    sinon.stub(floorServiceInstance, "createFloor").returns(Result.ok(expectedResult));

    const ctrl = new FloorController(floorServiceInstance as IFloorService);

    await ctrl.createFloor(<Request>req, <Response>res, <NextFunction>next);

    // Assertions
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match(expectedResult));
  });
  it('addPassages: returns JSON with added passages data', async function () {
    const floorServiceInstance = Container.get("FloorService");
  
    const floorData: IFloorDTO = {
      "id": "123",
      "name": "Floor 123",
      "description": "Welcome to floor 123",
      "hall": "dadad",
      "room": 4,
      "floorMap": "dasdada",
      "hasElevator": true,
      "passages": []
    };
  
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
  
    const req: Partial<Request> = {};
    req.body = { ...floorData, newPassage: floorDataPassage }; // Include newPassage in the request body
  
    const res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
    };
  
    const next: Partial<NextFunction> = () => {};
  
    const expectedResult: IFloorDTO = {
      ...floorData,
      passages: [FloorPassaDomain], // Expected result with added passage
    };
  
    sinon.stub(floorServiceInstance, "addPassages").returns(Result.ok(expectedResult));
  
    const ctrl = new FloorController(floorServiceInstance as IFloorService);
    await ctrl.addPassages(req as Request, res as Response, next as NextFunction);
  
    // Assertions
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match(expectedResult));
  });
  

});
