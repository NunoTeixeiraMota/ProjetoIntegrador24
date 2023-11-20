import IRoomDTO from "../dto/IRoomDTO";
import { Mapper } from '../core/infra/Mapper';
import { room } from "../domain/room";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class roomMap extends Mapper<room> {
  public static toDTO(room: room): IRoomDTO {
    return {
      id: room.id.toString(),
      floor: room.floor(),
      name: room.name.toString(),
      category: room.category(),
      description: room.description(),
      dimension: room.dimension()
    } as IRoomDTO;
  }

  public static async toDomain(dto: IRoomDTO): Promise<room> {
    const roomTypeOrError = room.create({
      floor: dto.floor,
      name: dto.name,
      category: dto.category,
      description: dto.description,
      dimension: dto.dimension
    }, new UniqueEntityID(dto.id));

    roomTypeOrError.isFailure ? console.log(roomTypeOrError.error) : '';

    return roomTypeOrError.isSuccess ? roomTypeOrError.getValue() : null;
  }

  public static toPersistence(room: room): IRoomDTO {
    return {
      id: room.id.toString(),
      floor: room.floor(),
      name: room.name.toString(),
      category: room.category(),
      description: room.description(),
      dimension: room.dimension()
    };
  }
}
