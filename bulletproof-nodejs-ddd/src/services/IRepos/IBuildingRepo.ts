import { Repo } from "../../core/infra/Repo";
import { Building } from "../../domain/building";
import { BuildingId } from "../../domain/buildingId";

export default interface IBuildingRepo extends Repo<Building> {
  save(building: Building): Promise<Building>;
  findByName(id: BuildingId | string): Promise<Building>;
  // You can define more methods for building-related operations as needed.
}
