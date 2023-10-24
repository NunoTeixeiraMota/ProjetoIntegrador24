import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import config from "../../config";
import { Result } from '../core/logic/Result';
import IBuildingService from "../services/IServices/IBuildingsService"; // Import your BuildingService interface
import BuildingController from "./buildingController"; // Import your BuildingController
import IBuildingDTO from '../dto/IBuildingDTO'; // Import your BuildingDTO

describe('Building controller', function () {
    beforeEach(function () {
    });

    it('createBuilding: returns json with id+name values', async function () {
        let body = {
            "name": 'Building1',
            "localizationoncampus": 'Campus A',
            "floors": 5,
            "lifts": 2
        };
        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => {};

        // Replace with the path to your BuildingService implementation.
        let buildingServiceClass = require(config.services.building.path).default;
        let buildingServiceInstance = Container.get(buildingServiceClass);
        Container.set(config.services.building.name, buildingServiceInstance);

        buildingServiceInstance = Container.get(config.services.building.name);
        sinon.stub(buildingServiceInstance, "createBuilding").returns(
            Result.ok<IBuildingDTO>({
                "id": "123",
                "name": req.body.name,
                "localizationoncampus": req.body.localizationoncampus,
                "floors": req.body.floors,
                "lifts": req.body.lifts
            })
        );

        const ctrl = new BuildingController(buildingServiceInstance as IBuildingService);

        await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match({
            "id": "123",
            "name": req.body.name,
            "localizationoncampus": req.body.localizationoncampus,
            "floors": req.body.floors,
            "lifts": req.body.lifts
        }));
    });
});
