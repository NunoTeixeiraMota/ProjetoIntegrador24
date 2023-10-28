import { FloorId } from "../domain/floorId";

export interface IBuildingsPersistence {
    id: string;
    name: string;
    localizationoncampus: string;
    floors: number;
    lifts: number;
    maxCel: number[];
    floorIds: FloorId[];
  }
  