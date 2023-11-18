import { Container } from 'typedi';
import { Mapper } from '../core/infra/Mapper';
import IBuildingDTO from '../dto/IBuildingDTO';
import { Building } from '../domain/building';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { floor, forEach } from 'lodash';
import { FloorMap } from './FloorMap';

export class BuildingsMap extends Mapper<Building> {
  public static toDTO(building: Building): IBuildingDTO {
    const FloorsDtoarray = building.floorOnBuilding.map(floor => FloorMap.toDTO(floor));
    return {
      id: building.buildingId.toString(),
      name: building.name,
      localizationoncampus: building.localizationoncampus,
      floors: building.floors,
      lifts: building.lifts,
      maxCel: building.maxCel,
      floorOnBuilding: FloorsDtoarray,
    } as IBuildingDTO;
  }

  public static async toDomain(dto: IBuildingDTO): Promise<Building> {
    const FloorsDtoarray = dto.floorOnBuilding.map(floor => FloorMap.toDomain(floor));
    const buildingOrError = Building.create({
      name: dto.name,
      localizationoncampus: dto.localizationoncampus,
      floors: dto.floors,
      lifts: dto.lifts,
      maxCel: dto.maxCel,
      floorOnBuilding: FloorsDtoarray,
    }, new UniqueEntityID(dto.id));

    buildingOrError.isFailure ? console.log(buildingOrError.error) : '';

    return buildingOrError.isSuccess ? buildingOrError.getValue() : null;
  }

  public static toPersistence(building: Building): IBuildingDTO {
    const FloorsPersistencearray = building.floorOnBuilding.map(floor => FloorMap.toPersistence(floor));
    return {
      id: building.id.toString(),
      name: building.name,
      localizationoncampus: building.localizationoncampus,
      floors: building.floors,
      lifts: building.lifts,
      maxCel : building.maxCel,
      floorOnBuilding: FloorsPersistencearray,
    };
  }
}
