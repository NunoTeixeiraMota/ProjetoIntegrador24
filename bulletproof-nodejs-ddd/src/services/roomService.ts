import { Service, Inject } from 'typedi';
import config from "../../config";
import { Result } from "../core/logic/Result";
import IRoomRepo from './IRepos/IRoomRepo';
import { room } from '../domain/room';
import { roomMap } from '../mappers/roomMap';
import IRoomService from './IServices/IRoomService';
import IRoomDTO from '../dto/IRoomDTO';
import IFloorRepo from './IRepos/IFloorRepo';

@Service()
export default class roomService implements IRoomService {
  constructor(
      @Inject(config.repos.room.name) private roomRepo : IRoomRepo,
      @Inject(config.repos.floor.name) private floorRepo: IFloorRepo,
  ) {}

  public async createRoom(roomDto: IRoomDTO): Promise<Result<IRoomDTO>> {
    try {
      const floor = await this.floorRepo.findByID(roomDto.floor.id);

      const roomOrError = room.create ({
        floor: floor,
        name: roomDto.name,
        category: roomDto.category,
        description: roomDto.description,
        dimension: roomDto.dimension
      });

      if (roomOrError.isFailure) {
        return Result.fail<IRoomDTO>(roomOrError.errorValue());
      }

      const roomResult = roomOrError.getValue();
      await this.roomRepo.save(roomResult);
      return Result.ok<IRoomDTO>( roomMap.toDTO(roomResult))
    } catch (e) {
      throw e;
    }
  }
}