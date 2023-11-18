import { Service, Inject } from 'typedi';

import { Floor } from '../domain/floor'; 
import { FloorId } from '../domain/floorId';
import { FloorMap } from '../mappers/FloorMap'; 

import { Document, FilterQuery, Model } from 'mongoose';
import { IFloorPersistence } from '../dataschema/IFloorPersistence'; 
import IFloorRepo from '../services/IRepos/IFloorRepo'; 
import IFloorDTO from '../dto/IFloorDTO';
import { Building } from '../domain/building';

@Service()
export default class FloorRepo implements IFloorRepo {
  private models: any;
  constructor(
    @Inject('floorSchema') private floorSchema: Model<IFloorPersistence & Document>, 
  ) {}
  async findByBuildingID(building: Building): Promise<IFloorDTO[]> {
    const buildingId = building.id.toString();
    try {
      const query = { buildingId: buildingId };
      const floorDocuments = await this.floorSchema.find(query as FilterQuery<IFloorPersistence & Document>);
      if (!floorDocuments || floorDocuments.length === 0) {
        return [];
      }
      return floorDocuments;
    } catch (err) {
      throw err;
    }
  }
  


  public async save (floor: Floor): Promise<Floor> {
   const query = {domainId : floor.id.toString()};
   const floorDocument = await this.floorSchema.findOne(query);
    try {
      if(floorDocument === null){


      const rawFloor: any = FloorMap.toPersistence(floor);
      const floorCreated = await this.floorSchema.create(rawFloor);
      return FloorMap.toDomain(floorCreated);
      } else {
        floorDocument.name = floor.name;
        floorDocument.description = floor.description;
        floorDocument.hall = floor.hall;
        floorDocument.room = floor.room;
        floorDocument.floorMap = floor.floorMap;
        floorDocument.hasElevator = floor.hasElevator;
        floorDocument.passages = floor.passages;
        await floorDocument.save();

        return floor;
      } 
    } catch (err) {
      throw err;
    }
  }

  public async exists (floor: Floor): Promise<boolean> {
    const idX = floor.id instanceof FloorId ? (<FloorId>floor.id).toValue : floor.id;
    const query = {domainId: idX};
    const floorDocument = await this.floorSchema.findOne(query as FilterQuery<IFloorPersistence & Document>);
    return !!floorDocument === true;
  }

  public async findByDomainId (floorId : FloorId | string): Promise <Floor> {
    const query = {domainId : floorId};
    const floorRecord = await this.floorSchema.findOne(query as FilterQuery<IFloorPersistence & Document>);

    if (floorRecord != null){
      return FloorMap.toDomain(floorRecord);
    }else {
      return null;
    }
  }

  async findAll(): Promise<Floor[]> {
    try {
      const floorDocuments = await this.floorSchema.find({});
      const floors = await Promise.all(floorDocuments.map((doc) => FloorMap.toDomain(doc)));
      return floors;
    } catch (err) {
      throw err;
    }
  }

  public async findByID(id: FloorId | string): Promise<Floor> {
    const query = { domainId: FloorId };
    const floor = await this.floorSchema.findOne(query as FilterQuery<IFloorPersistence & Document>);

    if (floor != null) {
      return FloorMap.toDomain(floor);
    } else {
      return null;
    }
  }
}