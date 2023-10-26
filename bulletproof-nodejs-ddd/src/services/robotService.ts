import { Service, Inject } from 'typedi';

import IRobotService from './IServices/IRobotService';
import IRobotTypeRepo from './IRepos/IRobotTypeRepo';
import IRobotTypeDTO from '../dto/IRobotTypeDTO';

import { RobotType } from '../domain/robotType';
import { Result } from '../core/logic/Result';

@Service()
export default class robotService implements IRobotService {
  constructor(
    @Inject('logger') private logger,
    @Inject('robotTypeRepo') private robotTypeRepo: IRobotTypeRepo
  ) {}

  public async createRobotType(robotTypeDTO: IRobotTypeDTO): Promise<Result<IRobotTypeDTO>> {
    try {
      const existingRobotType = await this.robotTypeRepo.findByDesignation(robotTypeDTO.designation);

      if (existingRobotType) {
        return Result.fail<IRobotTypeDTO>('Robot type with the same designation already exists');
      }

      const robotTypeOrError = RobotType.create({
        designation: robotTypeDTO.designation,
        brand: robotTypeDTO.brand,
        model: robotTypeDTO.model,
        tasks: robotTypeDTO.tasks
      });

      if (robotTypeOrError.isFailure) {
        throw Result.fail<IRobotTypeDTO>(robotTypeOrError.errorValue());
      }

      const robotTypeResult = robotTypeOrError.getValue();

      await this.robotTypeRepo.save(robotTypeResult);

      const robotTypeDTOResult = {
        designation: robotTypeResult.designation,
        brand: robotTypeResult.brand,
        model: robotTypeResult.model,
        tasks: robotTypeResult.tasks
      };

      return Result.ok<IRobotTypeDTO>(robotTypeDTO);
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}