import { Repo } from "../../core/infra/Repo";
import { Robot } from "../../domain/robot";

export default interface IRobotRepo extends Repo<Robot> {
  save(robot: Robot): Promise<Robot>;
  findById (id : string): Promise <Robot>;
}