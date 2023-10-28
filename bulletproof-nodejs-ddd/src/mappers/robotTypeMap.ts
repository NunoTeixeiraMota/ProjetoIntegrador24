import { RobotType } from "../domain/robotType";
import IRobotTypeDTO from "../dto/IRobotTypeDTO";
import { Mapper } from '../core/infra/Mapper';
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class RobotTypeMap extends Mapper<RobotType> {
  public static toDTO(robotType: RobotType): IRobotTypeDTO {
    return {
      id: robotType.id.toString(),
      designation: robotType.designation.toString(),
      brand: robotType.brand.toString(),
      model: robotType.model.toString(),
      task: robotType.task
    } as IRobotTypeDTO;
  }

  public static async toDomain(dto: IRobotTypeDTO): Promise<RobotType> {
    const robotTypeOrError = RobotType.create({
      designation: dto.designation.toString(),
      brand: dto.brand.toString(),
      model: dto.model.toString(),
      task: dto.task
    }, new UniqueEntityID(dto.id));

    robotTypeOrError.isFailure ? console.log(robotTypeOrError.error) : '';

    return robotTypeOrError.isSuccess ? robotTypeOrError.getValue() : null;
  }

  public static toPersistence(robotType: RobotType): IRobotTypeDTO {
    return {
      id: robotType.id.toString(),
      designation: robotType.designation.toString(),
      brand: robotType.brand.toString(),
      model: robotType.model.toString(),
      task: robotType.task
    };
  }
}
