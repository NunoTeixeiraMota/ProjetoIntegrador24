import { Floor } from "../domain/floor";

export interface IFloorPersistence {
    id:string;
    name: string;
    description: string;
    hall: string;
    room: number;
    floorMap: string;
    hasElevator: boolean;
    passages: Floor[];
  }