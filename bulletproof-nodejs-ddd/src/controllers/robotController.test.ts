import * as sinon from 'sinon';

import { Response, Request, NextFunction } from 'express';

import { Container } from 'typedi';
import config from "../../config";

import { Result } from '../core/logic/Result';
import robotController from './robotController';
import IRobotService from '../services/IServices/IRobotService';
import IRobotTypeDTO from '../dto/IRobotTypeDTO';

describe('RobotController (Integration Test)', function () {
    beforeEach(function() {
    });

    it('createRobotType: returns JSON with designation+brand+model+task values', async function () {
        let body = {
            "designation": "robolindo",
            "brand": "Croissants",
            "model": "do Lidl",
            "task": 2
        };
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };

        let next: Partial<NextFunction> = () => {};

        let robotServiceClass = require(config.services.robot.path).default;
        let robotServiceInstance = Container.get(robotServiceClass);
        Container.set(config.services.robot.name, robotServiceInstance);

        robotServiceInstance = Container.get(config.services.robot.name);
		sinon.stub(robotServiceInstance, "createRole").returns( Result.ok<IRobotTypeDTO>( {"designation": req.body.designation, "brand": req.body.brand, "model": req.body.model, "task": req.body.task} ));
        
        const ctrl = new robotController(robotServiceInstance as IRobotService);
        await ctrl.createRobotType(<Request>req, <Response>res, <NextFunction>next);

        // Assertions
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match({
            "designation": req.body.designation,
            "brand": req.body.brand,
            "model": req.body.model,
            "task": req.body.task,
        }));
    });
});
