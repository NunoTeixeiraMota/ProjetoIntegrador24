import { Service, Inject } from 'typedi';
import IFloorService from './IServices/IFloorService';
import { FloorMap } from '../mappers/FloorMap';
import IFloorDTO from '../dto/IFloorDTO';
import IFloorRepo from './IRepos/IFloorRepo';
import { Result } from '../core/logic/Result';
import config from '../../config';
import { Building } from '../domain/building';
import { BuildingsMap } from '../mappers/BuildingsMap';
<<<<<<< HEAD
=======
import IBuildingsService from './IServices/IBuildingsService';
import { BuildingId } from '../domain/buildingId';
import BuildingService from './buildingsService';

>>>>>>> f80e830f76b2629534815c22f83bf7f5327d6889

@Service()
export default class FloorService implements IFloorService {
  constructor(
    @Inject(config.repos.floor.name) private floorRepo: IFloorRepo, 
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
    const buildingsrv = Container.get<IBuildingsService>(config.services.buildings.name);
    try {
<<<<<<< HEAD
      const floorDocument = await this.floorRepo.findByID(floorDTO.id);
      const found = !!floorDocument;

      if (found) {
        return Result.fail<IFloorDTO>('Floor with the same id already exists');
      }

      const floor = await FloorMap.toDomain(floorDTO);
      if (floor == null) {
        return Result.fail<IFloorDTO>(floor);
      }
      await this.floorRepo.save(floor);
      const floorDTOResult = FloorMap.toDTO(floor) as IFloorDTO;
=======
      const floorOrError = Floor.create ({
        name: floorDTO.name,
        building: await buildingsrv.findByDomainId(floorDTO.building.id),
        description: floorDTO.description,
        hall: floorDTO.hall,
        room: floorDTO.room,
        floorMap: floorDTO.floorMap,
        hasElevator: floorDTO.hasElevator,
        passages: []
      });
      if (floorOrError.isFailure){
        throw Result.fail<IFloorDTO>(floorOrError.errorValue());
      }

     const floorResult = floorOrError.getValue();
      await this.floorRepo.save(floorResult); 
      const floorDTOResult = FloorMap.toDTO(floorResult) as IFloorDTO; 
>>>>>>> f80e830f76b2629534815c22f83bf7f5327d6889
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
        floor.name = floorDTO.name;
        floor.building = BuildingsMap.toDomain(floorDTO.building)
        floor.description = floorDTO.description;
        floor.hall = floorDTO.hall;
        floor.room = floorDTO.room;
        floor.floorMap = floorDTO.floorMap;
        floor.hasElevator = floorDTO.hasElevator;
        floor.passages = floorDTO.passages;

        await this.floorRepo.save(floor);

        const floorDTOResult = FloorMap.toDTO(floor) as IFloorDTO;
        return Result.ok<IFloorDTO>(floorDTOResult);
      }
    } catch (e) {
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