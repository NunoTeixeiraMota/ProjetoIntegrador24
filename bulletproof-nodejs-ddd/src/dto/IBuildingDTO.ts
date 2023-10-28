import { Floor } from "../domain/floor";
import { FloorId } from "../domain/floorId";

export default interface IBuildingDTO {
  id: string;
  name: string;
  localizationoncampus: string;
  floors: number;
  lifts: number;
  maxCel: number[];
  floorIds: FloorId[];
  // You can add more properties specific to building information as needed.
}
