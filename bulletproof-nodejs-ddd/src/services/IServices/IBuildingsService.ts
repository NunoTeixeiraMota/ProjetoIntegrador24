import { Result } from "../../core/logic/Result";
import IBuildingDTO from "../../dto/IBuildingDTO";

export default interface IBuildingsService {
  createBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>>;
  updateBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>>;

  getBuilding(buildingId: string): Promise<Result<IBuildingDTO>>;
  // You can add more methods for building-related operations as needed.
}
