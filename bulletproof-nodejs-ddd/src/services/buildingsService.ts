import { Container, Service, Inject } from 'typedi';


import IBuildingService from './IServices/IBuildingsService';
import { BuildingsMap } from '../mappers/BuildingsMap';
import IBuildingDTO from '../dto/IBuildingDTO';

import IBuildingRepo from './IRepos/IBuildingsRepo';

import { Building } from '../domain/building';

import { Result } from '../core/logic/Result';
import config from '../../config';
import { Floor } from '../domain/floor';
import IFloorDTO from '../dto/IFloorDTO';
import { FloorMap } from '../mappers/FloorMap';
import { BuildingId } from '../domain/buildingId';
import IFloorService from './IServices/IFloorService';
import { forEach } from 'lodash';
@Service()
export default class BuildingService implements IBuildingService {
  constructor(
    @Inject(config.repos.buildings.name) private buildingsRepo: IBuildingRepo,
    @Inject(config.services.floor.name) private floorServiceInstance: IFloorService
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

    const floors= this.floorServiceInstance.getFloorsOnBuilding(buildingDocument);
    const floorsWithPassages = (await floors).filter(floor => floor.passages.length > 0);
    const floorsDTO: IFloorDTO[] = floorsWithPassages;
    return floorsDTO;
  }

  async listBuildingsByFloors(minFloors: number, maxFloors: number): Promise<IBuildingDTO[]> {
    try {
      const buildingsInRange = await this.buildingsRepo.findByFloors(minFloors, maxFloors);
      return buildingsInRange;
    } catch (error) {
      console.log(error)
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
      // create an array called FloorsDTO as an array of FloorDTO

      const building = await BuildingsMap.toDomain(buildingDTO);
      if (building == null) {
        return Result.fail<IBuildingDTO>(building);
      }
      await this.buildingsRepo.save(building);
      const buildingDTOResult = BuildingsMap.toDTO(building) as IBuildingDTO;
      return Result.ok<IBuildingDTO>(buildingDTOResult);
    } catch (e) {
      console.log(e);
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
  //TODO
  async getAllFloorsInBuilding(buildingId: BuildingId): Promise<IFloorDTO[]> {
    try {
      // Retrieve the building
      const building = await this.buildingsRepo.findByDomainId(buildingId);
      if (!building) {
        throw new Error('Building not found');
      }
      const floorsInBuilding: Floor[]= [];
      const floorsInBuildingDTO: IFloorDTO[] = [];
      return floorsInBuildingDTO;
    } catch (err) {
      throw err; // Handle or log errors here
    }


  }
}

