import { Service, Inject } from 'typedi';

import { Building } from "../domain/building";
import { BuildingId } from "../domain/buildingId";
import { BuildingsMap } from "../mappers/BuildingsMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { IBuildingsPersistence } from '../dataschema/IBuildingsPersistence';
import IBuildingsRepo from '../services/IRepos/IBuildingsRepo';
import IBuildingDTO from '../dto/IBuildingDTO';
import { Floor } from '../domain/floor';
import { FloorMap } from '../mappers/FloorMap';


@Service()
export default class BuildingsRepo implements IBuildingsRepo {
  private models: any;

  constructor(
    @Inject('buildingsSchema') private buildingsSchema: Model<IBuildingsPersistence & Document>,
    @Inject('floorSchema') private floorSchema: Model<IBuildingsPersistence & Document>,
  ) {}
  async findByFloors(minFloors: number, maxFloors: number): Promise<IBuildingDTO[]> {
    try {
      // Use the buildingsSchema to query buildings within the specified range of floors
      const query: FilterQuery<IBuildingsPersistence & Document> = {
        floors: { $gte: minFloors, $lte: maxFloors },
      };
  
      const buildingDocuments = await this.buildingsSchema.find(query);
      return buildingDocuments;
    } catch (err) {
      console.error('Error in findByFloors:', err);
      throw err;
    }
  }
  
  
  async findByName(name: string): Promise<Building | null> {
    try {
      // Define the query to find a building by its name
      const query: FilterQuery<IBuildingsPersistence & Document> = { name };
  
      // Use buildingsSchema to find the building
      const buildingDocument = await this.buildingsSchema.findOne(query);
  
      // If a building is found, map it to the domain object, otherwise return null
      if (buildingDocument) {
        return BuildingsMap.toDomain(buildingDocument);
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  }
  

  private createBaseQuery(): any {
    return {
      where: {},
    };
  }

  public async exists(building: Building): Promise<boolean> {
    const idX = building.id instanceof BuildingId ? (<BuildingId>building.id).toValue() : building.id;

    const query = { domainId: idX };
    const buildingDocument = await this.buildingsSchema.findOne(query as FilterQuery<IBuildingsPersistence & Document>);

    return !!buildingDocument === true;
  }

  public async save(building: Building): Promise<Building> {
    const query = { domainId: building.id.toString() };

    const buildingDocument = await this.buildingsSchema.findOne(query);

    try {
      if (buildingDocument === null) {
        const rawBuilding: any = BuildingsMap.toPersistence(building);

        const buildingCreated = await this.buildingsSchema.create(rawBuilding) as unknown as IBuildingDTO;
        return BuildingsMap.toDomain(buildingCreated);
      } else {
        const FloorsDTO = 
        buildingDocument.name = building.name;
        buildingDocument.localizationoncampus = building.localizationoncampus;
        buildingDocument.floors = building.floors;
        buildingDocument.lifts = building.lifts;
        buildingDocument.maxCel = building.maxCel;
        await buildingDocument.save();

        return building;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId(buildingId: BuildingId | string): Promise<Building> {
    const query = { domainId: buildingId };
    const buildingRecord = await this.buildingsSchema.findOne(query as FilterQuery<IBuildingsPersistence & Document>);

    if (buildingRecord != null) {
      return BuildingsMap.toDomain(buildingRecord);
    } else {
      return null;
    }
  }

  public async findAll(): Promise<string[]> {
    try {
      const buildingDocuments = await this.buildingsSchema.find({});
      const buildingNames = buildingDocuments.map((doc) => doc.name.toString()); // Convert to string if necessary
      return buildingNames;
    } catch (err) {
      throw err;
    }
  }
  

}
