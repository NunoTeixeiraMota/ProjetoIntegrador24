import * as sinon from 'sinon';

import { Response, Request, NextFunction } from 'express';

import { Container } from 'typedi';
import config from "../../config";

import { Result } from '../core/logic/Result';
import IBuildingDTO from '../dto/IBuildingDTO';
import BuildingsController from './buildingsController';
import IBuildingService from '../services/IServices/IBuildingsService';



describe('BuildingsController (Integration Test)', function () {
    beforeEach(function() {
    });

    it('createBuilding: returns JSON with id+name values', async function () {
        let body = {
            "id": "123",
            "name": "Building 123",
            "localizationoncampus": "Campus XYZ",
            "floors": 5,
            "lifts": 2
        };
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };

        let next: Partial<NextFunction> = () => {};

        let buildingServiceClass = require(config.services.buildings.path).default;
        let buildingServiceInstance = Container.get(buildingServiceClass);
        Container.set(config.services.buildings.name, buildingServiceInstance);

        buildingServiceInstance = Container.get(config.services.buildings.name);
		sinon.stub(buildingServiceInstance, "createRole").returns( Result.ok<IBuildingDTO>( {"id": "123","name": req.body.name, "localizationoncampus": req.body.localizationoncampus, "floors": req.body.floors, "lifts": req.body.lifts} ));
        
        const ctrl = new BuildingsController(buildingServiceInstance as IBuildingService);
        await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next);

        // Assertions
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match({
            "id": "123",
            "name": req.body.name,
            "localizationoncampus": req.body.localizationoncampus,
            "floors": req.body.floors,
            "lifts": req.body.lifts,
        }));
    });
    it('findAll: returns an array of building names', async function () {
        const buildingNames = ['Building 1', 'Building 2'];

        const req: Partial<Request> = {};
        const res: Partial<Response> = {
            json: sinon.spy(),
        };
        const next: Partial<NextFunction> = () => {};

        // Mock the building service
        const buildingServiceClass = require('../src/services/buildingsService').default;
        const buildingServiceInstance = new buildingServiceClass();
        Container.set('BuildingsService', buildingServiceInstance);

        // Stub the findAll method to return predefined result
        sinon.stub(buildingServiceInstance, 'findAll').resolves(buildingNames);

        const ctrl = new BuildingsController(buildingServiceInstance as IBuildingService);
        await ctrl.findAll(<Request>req, <Response>res, <NextFunction>next);

        // Assertions
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, buildingNames);
    });
    
});
