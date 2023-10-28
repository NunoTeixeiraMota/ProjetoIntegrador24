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

@Service()
export default class buildingService implements IBuildingService {
  constructor(
    @Inject(config.repos.buildings.name) private buildingsRepo: IBuildingRepo,
    @Inject(config.repos.floor.name) private floorRepository: IFloorRepo ,
  ) {}
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
  updateBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
    throw new Error('Method not implemented.');
  }
  getBuilding(buildingId: string): Promise<Result<IBuildingDTO>> {
    throw new Error('Method not implemented.');
  }

  public async createBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
    try {
      const buildingDocument = await this.buildingsRepo.findByName(buildingDTO.name);
      const found = !!buildingDocument;

      if (found) {
        return Result.fail<IBuildingDTO>('Building with the same name already exists');
      }


      const buildingOrError = Building.create({
        name: buildingDTO.name,
        localizationoncampus: buildingDTO.localizationoncampus,
        floors: buildingDTO.floors,
        lifts: buildingDTO.lifts,
        maxCel: buildingDTO.maxCel,
        floorIds: buildingDTO.floorIds,
        // Add more properties as needed
      });

      if (buildingOrError.isFailure) {
        throw Result.fail<IBuildingDTO>(buildingOrError.errorValue());
      }

      const buildingResult = buildingOrError.getValue();

      // Additional processing or operations specific to building creation can be added here.

      await this.buildingsRepo.save(buildingResult);
      const buildingDTOResult = BuildingsMap.toDTO(buildingResult) as IBuildingDTO;
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
  
  async getAllFloorsInBuilding(buildingId: string): Promise<Floor[]> {
    try {
        // Retrieve the building
        const building = await this.buildingsRepo.findByName(buildingId);
        if (!building) {
            throw new Error('Building not found');
        }

        const floorIdsInBuilding = building.floorIds; // Assuming this array holds floor IDs

        const floorsInBuilding: Floor[] = [];
        for (const floorId of floorIdsInBuilding) {
            const floor = await this.floorRepository.findByID(floorId);
            if (floor) {
                floorsInBuilding.push(floor);
            }
        }

        return floorsInBuilding;
    } catch (err) {
        throw err; // Handle or log errors here
    }
}
}

