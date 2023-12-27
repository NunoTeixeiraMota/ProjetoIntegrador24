import { Result } from "../../core/logic/Result";
import { Room } from "../../domain/room";
import IRoomDTO from "../../dto/IRoomDTO";

export default interface IRoomService  {
    createRoom(roomDto: IRoomDTO): Promise<Result<IRoomDTO>>;
    findAll(): Promise<Room[]>;
}