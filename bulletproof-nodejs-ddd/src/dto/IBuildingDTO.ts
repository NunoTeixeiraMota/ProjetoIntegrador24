import { Floor } from "../domain/floor";
export default interface IBuildingDTO {
  id: string;
  name: string;
  localizationoncampus: string;
  floors: number;
  lifts: number;
  maxCel: number[];
  floorOnBuilding: Floor[];
  // You can add more properties specific to building information as needed.
}
