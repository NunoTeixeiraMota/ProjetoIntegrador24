import IRobotTypeDTO from '../../dto/IRobotTypeDTO';
import { Result } from '../../core/logic/Result';

export default interface IRobotTypeService {
  createRobotType(robotTypeDTO: IRobotTypeDTO): Promise<Result<IRobotTypeDTO>>;
}
