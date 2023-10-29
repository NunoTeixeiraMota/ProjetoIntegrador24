import { Result } from '../../core/logic/Result';
import IFloorDTO from '../../dto/IFloorDTO';

export default interface IFloorService {
  addPassages(floor: IFloorDTO, passageData: any): Promise<Result<IFloorDTO>>; 
  createFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>>;
  updateFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>>;
  patchFloorMap(floorId: string, updates: Partial<IFloorDTO>): Promise<Result<IFloorDTO>>;
  patchPassageBuilding(floorId: string, updates: Partial<IFloorDTO>): Promise<Result<IFloorDTO>>;
}