import { Floor } from "../../domain/floor";
import { Repo } from "../../core/infra/Repo";
import { FloorId } from "../../domain/floorId";
import IFloorDTO from "../../dto/IFloorDTO";
import { Building } from "../../domain/building";


export default interface IFloorRepo extends Repo<Floor>{
    save(floor: Floor): Promise<Floor>;
    findByID(id: FloorId | string): Promise<Floor>;
    findByBuildingID(building: Building): Promise<IFloorDTO[]>;
}