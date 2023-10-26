import { RobotType } from "../domain/robotType";
import IRobotTypeDTO from "../dto/IRobotTypeDTO";
import { Mapper } from '../core/infra/Mapper';

export class RobotTypeMap extends Mapper<RobotType> {
  public static toDTO(robotType: RobotType): IRobotTypeDTO {
    return {
      designation: robotType.designation.toString(),
      brand: robotType.brand.toString(),
      model: robotType.model.toString(),
      tasks: robotType.tasks
    } as IRobotTypeDTO;
  }

  public static async toDomain(dto: IRobotTypeDTO): Promise<RobotType> {
    const robotTypeOrError = RobotType.create({
        designation: dto.designation.toString(),
        brand: dto.brand.toString(),
        model: dto.model.toString(),
        tasks: dto.tasks
    }, dto.designation.toString());

    robotTypeOrError.isFailure ? console.log(robotTypeOrError.error) : '';

    return robotTypeOrError.isSuccess ? robotTypeOrError.getValue() : null;
  }

  public static toPersistence(robotType: RobotType): IRobotTypeDTO {
    return {
        designation: robotType.designation.toString(),
        brand: robotType.brand.toString(),
        model: robotType.model.toString(),
        tasks: robotType.tasks
    };
  }
}
