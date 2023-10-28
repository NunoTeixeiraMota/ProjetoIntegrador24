import { Result } from "../../core/logic/Result";
import { Floor } from "../../domain/floor";
import IBuildingDTO from "../../dto/IBuildingDTO";

export default interface IBuildingsService {
  createBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>>;
  updateBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>>;
  getBuilding(buildingId: string): Promise<Result<IBuildingDTO>>;
  findAll(): Promise<string[]>;
  listBuildingsByFloors(minFloors: number, maxFloors: number): Promise<IBuildingDTO[]>;
  getAllFloorsInBuilding(buildingId: string): Promise<Floor[]>;
}
