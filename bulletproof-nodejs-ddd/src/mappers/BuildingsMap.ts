import { Container } from 'typedi';
import { Mapper } from '../core/infra/Mapper';
import IBuildingDTO from '../dto/IBuildingDTO';
import { Building } from '../domain/building';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';

export class BuildingsMap extends Mapper<Building> {
  public static toDTO(building: Building): IBuildingDTO {
    return {
      id: building.buildingId.toString(), // Adjust based on your identifier type
      name: building.name,
      localizationoncampus: building.localizationoncampus,
      floors: building.floors,
      lifts: building.lifts,
    } as IBuildingDTO;
  }

  public static async toDomain(dto: IBuildingDTO): Promise<Building> {
    const buildingOrError = Building.create({
      name: dto.name,
      localizationoncampus: dto.localizationoncampus,
      floors: dto.floors,
      lifts: dto.lifts,
    }, new UniqueEntityID(dto.id)); // Adjust for your identifier type

    buildingOrError.isFailure ? console.log(buildingOrError.error) : '';

    return buildingOrError.isSuccess ? buildingOrError.getValue() : null;
  }

  public static toPersistence(building: Building): IBuildingDTO {
    return {
      id: building.id.toString(), // Adjust for your identifier type
      name: building.name,
      localizationoncampus: building.localizationoncampus,
      floors: building.floors,
      lifts: building.lifts,
    };
  }
}
