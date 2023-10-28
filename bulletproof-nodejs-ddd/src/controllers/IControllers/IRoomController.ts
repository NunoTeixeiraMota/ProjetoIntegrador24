import { Request, Response, NextFunction } from 'express';

export default interface IBuildingsController {
    createRoom(req: Request, res: Response, next: NextFunction): Promise<void>;
}
