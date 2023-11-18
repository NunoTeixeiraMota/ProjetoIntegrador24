import { Floor } from "../domain/floor";
import IFloorDTO from "../dto/IFloorDTO";

export interface IBuildingsPersistence {
    id: string;
    name: string;
    localizationoncampus: string;
    floors: number;
    lifts: number;
    maxCel: number[];
    floorOnBuilding: IFloorDTO[];
  }
  