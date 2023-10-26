import { Repo } from "../../core/infra/Repo";
import { RobotType } from "../../domain/robotType";

export default interface IRobotTypeRepo extends Repo<RobotType> {
  save(robotType: RobotType): Promise<RobotType>;
  findByDesignation(designation: string): Promise<RobotType>;
}