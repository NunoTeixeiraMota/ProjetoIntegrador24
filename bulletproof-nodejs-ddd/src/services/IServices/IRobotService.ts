import IRobotTypeDTO from '../../dto/IRobotTypeDTO';
import { Result } from '../../core/logic/Result';

export default interface IRobotService {
  createRobotType(robotTypeDTO: IRobotTypeDTO): Promise<Result<IRobotTypeDTO>>;
}
