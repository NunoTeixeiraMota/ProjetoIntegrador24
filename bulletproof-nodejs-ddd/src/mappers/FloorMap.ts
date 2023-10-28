import { Container } from 'typedi';
import {Mapper} from '../core/infra/Mapper';
import { Floor } from '../domain/floor';
import IFloorDTO from '../dto/IFloorDTO';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';

export class FloorMap extends Mapper<Floor> {
  public static toDTO(floor: Floor): IFloorDTO {
    return {
      name: floor.name,
      description: floor.description,
      hall: floor.hall,
      room: floor.room,
      floorMap: floor.floorMap || '', 
      hasElevator: floor.hasElevator,
    
    } as IFloorDTO;
  }

  public static async toDomain(dto: IFloorDTO): Promise<Floor> {
    const florOrError = Floor.create( {
      name: dto.name,
      description: dto.description,
      hall: dto.hall,
      room: dto.room,
      floorMap: dto.floorMap,
      hasElevator: dto.hasElevator,
    }, new UniqueEntityID(dto.id));
    florOrError.isFailure ? console.log(florOrError.error) : '';

    return florOrError.isSuccess ? florOrError.getValue() : null;
  }

  public static toPersistence(floor: Floor): IFloorDTO {
    return {
      id: floor.id.toString(),
      name: floor.name,
      description: floor.description,
      hall: floor.hall,
      room: floor.room,
      floorMap: floor.floorMap,
      hasElevator: floor.hasElevator,
    };
  }
}
