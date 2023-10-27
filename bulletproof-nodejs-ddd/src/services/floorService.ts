import { Container, Service, Inject } from 'typedi';

import { randomBytes } from 'crypto';

import IFloorService from './IServices/IFloorService';
import { FloorMap } from '../mappers/FloorMap';
import IFloorDTO from '../dto/IFloorDTO';

import IFloorRepo from './IRepos/IFloorRepo';

import { Floor } from '../domain/floor';

import { Result } from '../core/logic/Result';
import config from '../../config';
import { floor } from 'lodash';
import { error } from 'console';


@Service()
export default class FloorService implements IFloorService {
  constructor(
    @Inject(config.repos.floor.name) private floorRepo: IFloorRepo, 
  ) {}

  async createFloor(floorDTO:IFloorDTO): Promise<Result<IFloorDTO>> {
    try {
      const floorOrError = Floor.create ({
        name: floorDTO.name,
        description: floorDTO.description,
        hall: floorDTO.hall,
        room: floorDTO.room,
        floorMap: floorDTO.floorMap,
        hasElevator: floorDTO.hasElevator

      });
      if (floorOrError.isFailure){
        throw Result.fail<IFloorDTO>(floorOrError.errorValue());
      }

     const floorResult = floorOrError.getValue();

      await this.floorRepo.save(floorResult); 
      const floorDTOResult = FloorMap.toDTO(floorResult) as IFloorDTO; 
      return Result.ok<IFloorDTO>(floorDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async updateFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
    try {
      const floor = await this.floorRepo.findByID(floorDTO.id)

      if (floor === null) {
        return Result.fail<IFloorDTO>("Floor not found");
      } else {
        floor.name = floorDTO.name;
        floor.description = floorDTO.description;
        floor.hall = floorDTO.hall;
        floor.room = floorDTO.room;
        floor.floorMap = floorDTO.floorMap;
        floor.hasElevator = floorDTO.hasElevator;

        await this.floorRepo.save(floor);

        const floorDTOResult = FloorMap.toDTO(floor) as IFloorDTO;
        return Result.ok<IFloorDTO>(floorDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }
}
