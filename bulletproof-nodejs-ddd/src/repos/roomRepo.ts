import { Service, Inject } from 'typedi';
import { Model, Document} from 'mongoose';
import { room } from '../domain/room';
import { IRoomPersistence } from '../dataschema/IRoomPersistence';
import IRoomRepo from './IRepos/IRoomRepo';
import { roomMap } from "../mappers/roomMap";

function doRoomsOverlap(roomA: room, roomB: room): boolean {
    const roomATopLeft = { x: roomA.dimension[0], y: roomA.dimension[1] };
    const roomABottomRight = { x: roomA.dimension[0] + roomA.dimension[2], y: roomA.dimension[1] + roomA.dimension[3] };
    const roomBTopLeft = { x: roomB.dimension[0], y: roomB.dimension[1] };
    const roomBBottomRight = { x: roomB.dimension[0] + roomB.dimension[2], y: roomB.dimension[1] + roomB.dimension[3] };
  
    return (
      roomATopLeft.x < roomBBottomRight.x &&
      roomABottomRight.x > roomBTopLeft.x &&
      roomATopLeft.y < roomBBottomRight.y &&
      roomABottomRight.y > roomBTopLeft.y
    );
  }

@Service()
export default class RoomRepo implements IRoomRepo {
    buildingsSchema: any;
    floorSchema: any;
  constructor(
    @Inject('roomSchema') private roomSchema: Model<IRoomPersistence & Document>,
  ) {}
    exists(t: room): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    
    async save(room: room): Promise<room> {
        const existingId = await this.roomSchema.findOne({ id: room.id });
        const existingName = await this.roomSchema.findOne({ name: room.name });

        try {
            if (existingId === null && existingName === null) {
                const roomFloorId = room.floor().id;
                const roomsSameFloor = await this.roomSchema.find({
                    $and: [
                        { 'floor.id': roomFloorId },
                    ],
                });
                
                const roomInstances = roomsSameFloor.map((doc: any) => roomMap.toDTO(doc));

                if (roomInstances != null) {
                    const isOverlap = roomInstances.some((otherRoom) => {
                        const tempRoom = {
                            id: otherRoom.id,
                            floor: otherRoom.floor,
                            name: otherRoom.name,
                            category: otherRoom.category,
                            description: otherRoom.description,
                            dimension: otherRoom.dimension
                        } as any;
                        return doRoomsOverlap(room, tempRoom);
                    });

                    if (isOverlap) {
                        throw new Error('Room overlaps with existing rooms.');
                    }
                }

                const rawRoom: any = roomMap.toPersistence(room);
                const roomCreated = await this.roomSchema.create(rawRoom);
                return roomMap.toDomain(roomCreated);
            } else {
                throw new Error('Room ID or name is not unique.');
            }
        } catch (err) {
            throw err;
        }
    } 
}