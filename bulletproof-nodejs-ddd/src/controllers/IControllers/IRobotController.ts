import { Request, Response, NextFunction } from 'express';

export default interface IRobotTypesController {
  createRobotType(req: Request, res: Response, next: NextFunction): Promise<void>;
}