import { Router } from 'express';

import building from './routes/buildingRoute';
import floor from './routes/floorRoute';
import robot from './routes/robotRoute';
import room from './routes/roomRoute';
import lift from './routes/liftRoute';

export default () => {
	const app = Router();

	building(app);
	floor(app);
	robot(app);
	room(app);
	lift(app);

	return app
}