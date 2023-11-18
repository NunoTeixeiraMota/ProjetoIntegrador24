import { Floor } from "../domain/floor";
import IFloorDTO from "./IFloorDTO";
export default interface IBuildingDTO {
  id: string;
  name: string;
  localizationoncampus: string;
  floors: number;
  lifts: number;
  maxCel: number[];
}
