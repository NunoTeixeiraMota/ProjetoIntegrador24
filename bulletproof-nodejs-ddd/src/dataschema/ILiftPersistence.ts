import { Building } from "../domain/building";

export interface ILiftPersistence {
    domainId: string;
    localization: string;
    state: string;
    building: Building;
  }

