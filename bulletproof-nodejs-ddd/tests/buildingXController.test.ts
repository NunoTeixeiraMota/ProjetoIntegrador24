import 'reflect-metadata';
import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../src/core/logic/Result';
import IBuildingService from "../src/services/IServices/IBuildingsService"; // Import your BuildingService interface
import BuildingController from "../src/controllers/buildingController"; // Import your BuildingController
import IBuildingDTO from '../src/dto/IBuildingDTO'; // Import your BuildingDTO

describe('Building controller', function () {
	const sandbox = sinon.createSandbox();

	beforeEach(function() {
		Container.reset();
		// Initialize dependencies, repositories, and services as needed.
	});

	afterEach(function() {
		sandbox.restore();
	});

	it('BuildingController unit test using BuildingService stub', async function () {
		// Arrange
		let body = { "name": 'Building1', "localizationoncampus": 'Campus A', "floors": 5, "lifts": 2 };
		let req: Partial<Request> = {};
		req.body = body;
		let res: Partial<Response> = {
			json: sinon.spy()
		};
		let next: Partial<NextFunction> = () => {};

		// Create a stub for the BuildingService and configure it to return a Result with a BuildingDTO.
		let buildingServiceInstance = Container.get("BuildingService") as IBuildingService;
		sinon.stub(buildingServiceInstance, "createBuilding").returns(
			Result.ok<IBuildingDTO>({
				"id": "123",
				"name": req.body.name,
				"localizationoncampus": req.body.localizationoncampus,
				"floors": req.body.floors,
				"lifts": req.body.lifts
			})
		);

		const ctrl = new BuildingController(buildingServiceInstance);

		// Act
		await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({
			"id": "123",
			"name": req.body.name,
			"localizationoncampus": req.body.localizationoncampus,
			"floors": req.body.floors,
			"lifts": req.body.lifts
		}));
	});

	// Add more test cases as needed for other scenarios.
});
