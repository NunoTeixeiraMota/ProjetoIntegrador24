import Floor from "./floor";

export default interface IBuildingDTO {
  id: string;
  name: string;
  localizationoncampus: string;
  floors: number;
  lifts: number;
  maxCel: number[];
  floorOnBuilding: Floor[];
}