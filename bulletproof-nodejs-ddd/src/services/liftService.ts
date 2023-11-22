import Container, { Service, Inject } from 'typedi';
import config from "../../config";
import ILiftDTO from '../dto/ILiftDTO';
import { Lift } from "../domain/lift";
import ILiftRepo from '../repos/IRepos/ILiftRepo';
import ILiftService from './IServices/ILiftService';
import { Result } from "../core/logic/Result";
import { LiftMap } from "../mappers/LiftMap";
import IBuildingsService from './IServices/IBuildingsService';

@Service()
export default class LiftService implements ILiftService {
  constructor(
    @Inject(config.repos.lift.name) private liftRepo: ILiftRepo
  ) {}

  public async getLift(liftId: string): Promise<Result<ILiftDTO>> {
    try {
      const lift = await this.liftRepo.findByDomainId(liftId);

      if (lift === null) {
        return Result.fail<ILiftDTO>("Lift not found");
      } else {
        const liftDTOResult = LiftMap.toDTO(lift) as ILiftDTO;
        return Result.ok<ILiftDTO>(liftDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  public async createLift(liftDTO: ILiftDTO): Promise<Result<ILiftDTO>> {
    try {
      const buildingsrv = Container.get<IBuildingsService>(config.services.buildings.name);
      const liftOrError = Lift.create({
        localization: liftDTO.localization,
        state: liftDTO.state,
        building: await buildingsrv.findByDomainId(liftDTO.building.id)
      });

      console.log(liftOrError);
      if (liftOrError.isFailure) {
        return Result.fail<ILiftDTO>(liftOrError.errorValue());
      }
      const liftresult = liftOrError.getValue();
      await this.liftRepo.save(liftresult);
      const liftDTOResult = LiftMap.toDTO(liftresult) as ILiftDTO;
      return Result.ok<ILiftDTO>(liftDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async updateLift(liftDTO: ILiftDTO): Promise<Result<ILiftDTO>> {
    try {
      const lift = await this.liftRepo.findByDomainId(liftDTO.id);

      if (lift === null) {
        return Result.fail<ILiftDTO>("Lift not found");
      } else {
        lift.localization = liftDTO.localization;
        lift.state = liftDTO.state;
        lift.building = liftDTO.building; // Assuming building is a reference

        await this.liftRepo.save(lift);

        const liftDTOResult = LiftMap.toDTO(lift) as ILiftDTO;
        return Result.ok<ILiftDTO>(liftDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }
}
