import { Floor } from "../../domain/floor";
import { Repo } from "../../core/infra/Repo";
import { FloorId } from "../../domain/floorId";


export default interface IFloorRepo extends Repo<Floor>{
    save(flor: Floor): Promise<Floor>;
    updateFloor(flor: Floor): Promise<Floor>;
}