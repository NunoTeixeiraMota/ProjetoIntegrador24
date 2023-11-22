import { Building } from "../domain/building";

export default interface ILiftDTO {
  	_id: string;
	localization: string;
	state: string;
	building: Building;
}
