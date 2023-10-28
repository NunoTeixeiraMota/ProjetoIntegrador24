import { Service, Inject } from 'typedi';
import config from "../../config";
import { Result } from "../core/logic/Result";
import IRoomRepo from './IRepos/IRoomRepo';
import { room } from '../domain/room';
import { roomMap } from '../mappers/roomMap';
import IRoomService from './IServices/IRoomService';
import IRoomDTO from '../dto/IRoomDTO';

@Service()
export default class roomService implements IRoomService {
  constructor(
      @Inject(config.repos.room.name) private roomRepo : IRoomRepo
  ) {}

  public async createRoom(roomDto: IRoomDTO): Promise<Result<IRoomDTO>> {
    try {

      const roomOrError = await room.create(roomDto);

      if (roomOrError.isFailure) {
        return Result.fail<IRoomDTO>(roomOrError.errorValue());
      }

      const roomResult = roomOrError.getValue();

      await this.roomRepo.save(roomResult);

      const roomDTOResult = roomMap.toDTO( roomResult ) as IRoomDTO;
      return Result.ok<IRoomDTO>( roomDTOResult )
    } catch (e) {
      throw e;
    }
  }
}