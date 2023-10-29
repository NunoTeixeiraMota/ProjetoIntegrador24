import { Service, Inject } from 'typedi';

import IRobotService from './IServices/IRobotService';
import IRobotTypeRepo from './IRepos/IRobotTypeRepo';
import IRobotTypeDTO from '../dto/IRobotTypeDTO';

import { RobotType } from '../domain/robotType';
import { Result } from '../core/logic/Result';
import IRobotDTO from '../dto/IRobotDTO';
import { Robot } from '../domain/robot';

@Service()
export default class robotService implements IRobotService {
  robotRepo: any;
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
        task: robotTypeDTO.task
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
        task: robotTypeResult.task
      };

      return Result.ok<IRobotTypeDTO>(robotTypeDTO);
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async addRobot(robot: IRobotDTO): Promise<Result<IRobotDTO>> {
    try {
      const robotOrError = Robot.create({
        nickname: robot.nickname,
        type: robot.type,
        serialNumber: robot.serialNumber,
        description: robot.description
      });

      if (robotOrError.isFailure) {
        throw Result.fail<IRobotDTO>(robotOrError.errorValue());
      }

      const robotResult = robotOrError.getValue();
      await this.robotRepo.save(robotResult);

      const robotDTOResult = {
        id: robotResult.id.toString(),
        nickname: robotResult.nickname,
        type: robotResult.type,
        serialNumber: robotResult.serialNumber,
        description: robotResult.description
      };

      return Result.ok<IRobotDTO>(robotDTOResult);
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}