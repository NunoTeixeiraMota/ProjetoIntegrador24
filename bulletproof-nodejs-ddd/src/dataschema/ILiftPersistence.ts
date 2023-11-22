import { Building } from "../domain/building";

export interface ILiftPersistence {
    _id: string;
    localization: string;
    state: string;
    building: Building;
  }

