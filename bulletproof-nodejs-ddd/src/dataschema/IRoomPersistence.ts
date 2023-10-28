import { RoomCategory } from '../domain/room';

export interface IRoomPersistence {
    id: string;
    building: string;
    floor: string;
    name: string;
    category: RoomCategory;
    description: string;
    dimension: number[];
}