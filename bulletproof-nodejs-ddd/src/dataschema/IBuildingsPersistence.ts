import { Floor } from "../domain/floor";

export interface IBuildingsPersistence {
    id: string;
    name: string;
    localizationoncampus: string;
    floors: number;
    lifts: number;
    maxCel: number[];
    floorOnBuilding: Floor[];
  }
  