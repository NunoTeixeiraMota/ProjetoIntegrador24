import { Request, Response, NextFunction } from 'express';

export default interface IBuildingsController {
    createFloor(req: Request, res: Response, next: NextFunction): Promise<void>;
}
