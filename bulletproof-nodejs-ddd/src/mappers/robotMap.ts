import { Mapper } from '../core/infra/Mapper';
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import IRobotDTO from "../dto/IRobotDTO";
import { Robot } from "../domain/robot";

export class RobotMap extends Mapper<Robot> {
  public static toDTO(robot: Robot): IRobotDTO {
    return {
      id: robot.id.toString(),
      nickname: robot.nickname.toString(),
      type: robot.type,
      serialNumber: robot.serialNumber.toString(),
      description: robot.description.toString()
    } as IRobotDTO;
  }

  public static async toDomain(dto: IRobotDTO): Promise<Robot> {
    const robotOrError = Robot.create({
        nickname: dto.nickname.toString(),
        type: dto.type,
        serialNumber: dto.serialNumber.toString(),
        description: dto.description.toString()
    }, new UniqueEntityID(dto.id));

    robotOrError.isFailure ? console.log(robotOrError.error) : '';

    return robotOrError.isSuccess ? robotOrError.getValue() : null;
  }

  public static toPersistence(robot: Robot): IRobotDTO {
    return {
        id: robot.id.toString(),
        nickname: robot.nickname.toString(),
        type: robot.type,
        serialNumber: robot.serialNumber.toString(),
        description: robot.description.toString()
    };
  }
}
