import { Container, Service, Inject } from 'typedi';

import { randomBytes } from 'crypto';

import IBuildingService from './IServices/IBuildingsService';
import { BuildingsMap } from '../mappers/BuildingsMap';
import IBuildingDTO from '../dto/IBuildingDTO';

import IBuildingRepo from './IRepos/IBuildingsRepo';

import { Building } from '../domain/building';

import { Result } from '../core/logic/Result';
import config from '../../config';
import { Floor } from '../domain/floor';
import IFloorRepo from './IRepos/IFloorRepo';
import IFloorDTO from '../dto/IFloorDTO';
import { FloorMap } from '../mappers/FloorMap';
import { floor, forEach } from 'lodash';
import { BuildingId } from '../domain/buildingId';

@Service()
export default class buildingService implements IBuildingService {
  constructor(
    @Inject(config.repos.buildings.name) private buildingsRepo: IBuildingRepo,
    @Inject(config.repos.floor.name) private floorRepository: IFloorRepo,
  ) { }
  findByDomainId(buildingId: BuildingId): Promise<Building> {
    const buildingDocument =  this.buildingsRepo.findByDomainId(buildingId);
    if (!buildingDocument) {
      throw new Error('Building not found');
    }
    return buildingDocument;
  }

  async ListBuildingFloorWithPassageToOtherBuilding(buildingId: string): Promise<IFloorDTO[]> {
    const buildingID = new BuildingId(buildingId);
    const buildingDocument = await this.buildingsRepo.findByDomainId(buildingID);

    if (!buildingDocument) {
      throw new Error('Building not found');
    }

    // Filter the floors based on the condition that their 'floorOnBuilding' array is not empty
    const floorsWithPassages = buildingDocument.floorOnBuilding.filter((floor: Floor) => {
      return floor.passages.length > 0;
    });
    const floorsDTO: IFloorDTO[] = floorsWithPassages.map(floor => FloorMap.toDTO(floor));
    return floorsDTO;
  }

  async listBuildingsByFloors(minFloors: number, maxFloors: number): Promise<IBuildingDTO[]> {
    try {
      // Use the buildingsRepo to query buildings that fall within the specified range of floors.
      const buildingsInRange = await this.buildingsRepo.findByFloors(minFloors, maxFloors);

      // Map the buildings to DTOs
      const buildingDTOs = buildingsInRange.map(building => BuildingsMap.toDTO(building));

      return buildingDTOs;
    } catch (error) {
      // Handle any errors that occur during the operation, e.g., database errors.
      throw error;
    }
  }
  public async updateBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
    const buildingID = new BuildingId(buildingDTO.id);
    try {
        const buildingDocument = await this.buildingsRepo.findByDomainId(buildingID);
        
        await this.buildingsRepo.save(buildingDocument);

        const BDTOP = BuildingsMap.toDTO(buildingDocument);

        return Result.ok(BDTOP);
    } catch (error) {
        return Result.fail<IBuildingDTO>("Failed to update building");
    }
}
  public async createBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
    try {
      const buildingDocument = await this.buildingsRepo.findByName(buildingDTO.name);
      const found = !!buildingDocument;

      if (found) {
        return Result.fail<IBuildingDTO>('Building with the same name already exists');
      }

      const building = await BuildingsMap.toDomain(buildingDTO);
      if (building == null) {
        return Result.fail<IBuildingDTO>(building);
      }

      await this.buildingsRepo.save(building);
      const buildingDTOResult = BuildingsMap.toDTO(building) as IBuildingDTO;
      return Result.ok<IBuildingDTO>(buildingDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async findAll(): Promise<string[]> {
    try {
      const buildingNames = await this.buildingsRepo.findAll();
      return buildingNames;
    } catch (err) {
      throw err;
    }
  }

  async getAllFloorsInBuilding(buildingId: BuildingId): Promise<IFloorDTO[]> {
    try {
      // Retrieve the building
      const building = await this.buildingsRepo.findByDomainId(buildingId);
      if (!building) {
        throw new Error('Building not found');
      }


      const floorsInBuilding: Floor[] = building.floorOnBuilding;
      const floorsInBuildingDTO = floorsInBuilding.map(floor => FloorMap.toDTO(floor));

      return floorsInBuildingDTO;
    } catch (err) {
      throw err; // Handle or log errors here
    }


  }
}

