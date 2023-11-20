import { Service, Inject } from 'typedi';
import IFloorService from './IServices/IFloorService';
import { FloorMap } from '../mappers/FloorMap';
import IFloorDTO from '../dto/IFloorDTO';
import IFloorRepo from '../repos/IRepos/IFloorRepo';
import { Result } from '../core/logic/Result';
import config from '../../config';
import { Building } from '../domain/building';
import { Floor } from '../domain/floor';
import IBuildingsRepo from '../repos/IRepos/IBuildingsRepo';


@Service()
export default class FloorService implements IFloorService {
  constructor(
    @Inject(config.repos.floor.name) private floorRepo: IFloorRepo, 
    @Inject(config.repos.buildings.name) private buildingsRepo: IBuildingsRepo,
  ) {}
  getFloorsOnBuilding(building: Building): Promise<IFloorDTO[]> {
    throw new Error('Method not implemented.');
  }
  async addPassages(floor: IFloorDTO, passageData: any): Promise<Result<IFloorDTO>> {
    try {
      const errorOrFloor = await this.floorRepo.findByID(floor.id);

      if (!errorOrFloor) {
        return Result.fail<IFloorDTO>('Floor not found');
      }

      errorOrFloor.passages.push(...passageData);

      await this.floorRepo.save(errorOrFloor);
      const floorDTOResult = FloorMap.toDTO(errorOrFloor) as IFloorDTO;
      return Result.ok<IFloorDTO>(floorDTOResult);
    } catch (e) {
      throw e;
    }
  }

  async createFloor(floorDTO:IFloorDTO): Promise<Result<IFloorDTO>> {
    try {
      const building = await this.buildingsRepo.findByDomainId(floorDTO.building.id);
      const passages = await Promise.all(floorDTO.passages.map(async floor => {
        return await this.floorRepo.findByID(floor.id);
      }));

      const floorOrError = Floor.create ({
        name: floorDTO.name,
        building: building,
        description: floorDTO.description,
        hall: floorDTO.hall,
        room: floorDTO.room,
        floorMap: floorDTO.floorMap,
        hasElevator: floorDTO.hasElevator,
        passages: passages
      });

      if (floorOrError.isFailure){
        throw Result.fail<IFloorDTO>(floorOrError.errorValue());
      }

      const floorResult = floorOrError.getValue();
      await this.floorRepo.save(floorResult); 
      const floorDTOResult = FloorMap.toDTO(floorResult) as IFloorDTO; 
      return Result.ok<IFloorDTO>(floorDTOResult);
    } catch (e) {
      console.error('Error in createFloor:', e);
      throw e;
    }
  }

  public async updateFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
    try {
      const floor = await this.floorRepo.findByID(floorDTO.id)

      if (floor === null) {
        return Result.fail<IFloorDTO>("Floor not found");
      } else {
        const building = await this.buildingsRepo.findByDomainId(floorDTO.building.id);
        const passages = await Promise.all(floorDTO.passages.map(async floor => {
          return await this.floorRepo.findByID(floor.id);
        }));

        const floorOrError = Floor.create ({
          name: floorDTO.name,
          building: building,
          description: floorDTO.description,
          hall: floorDTO.hall,
          room: floorDTO.room,
          floorMap: floorDTO.floorMap,
          hasElevator: floorDTO.hasElevator,
          passages: passages
        });

        if (floorOrError.isFailure){
          throw Result.fail<IFloorDTO>(floorOrError.errorValue());
        }
  
        const floorResult = floorOrError.getValue();
        await this.floorRepo.save(floorResult); 
        const floorDTOResult = FloorMap.toDTO(floorResult) as IFloorDTO; 
        return Result.ok<IFloorDTO>(floorDTOResult);
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  public async patchFloorMap(floorId: string, updates: Partial<IFloorDTO>): Promise<Result<IFloorDTO>> {
    try {
      const floor = await this.floorRepo.findByID(floorId);
  
      if (!floor) {
        return Result.fail<IFloorDTO>('Floor not found');
      }
  
      for (const key in updates) {
        if (updates.hasOwnProperty(key)) {
          if (key === 'floorMap') {
            floor.floorMap = updates.floorMap;
          } else {
            floor[key] = updates[key];
          }
        }
      }
  
      await this.floorRepo.save(floor);
  
      const floorDTOResult = FloorMap.toDTO(floor) as IFloorDTO;
      return Result.ok<IFloorDTO>(floorDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async patchPassageBuilding(floorId: string, updates: Partial<IFloorDTO>): Promise<Result<IFloorDTO>> {
    try {
      const floor = await this.floorRepo.findByID(floorId);
  
      if (!floor) {
        return Result.fail<IFloorDTO>('Floor not found');
      }
  
      for (const key in updates) {
        if (updates.hasOwnProperty(key)) {
          if (key === 'passages') {
            floor.passages = updates.passages;
          } else {
            floor[key] = updates[key];
          }
        }
      }
  
      await this.floorRepo.save(floor);
  
      const floorDTOResult = FloorMap.toDTO(floor) as IFloorDTO;
      return Result.ok<IFloorDTO>(floorDTOResult);
    } catch (e) {
      throw e;
    }
  }
}