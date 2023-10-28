import { RoomCategory } from '../domain/room';

interface RoomDTO {
  id: string;
  building: string;
  floor: string;
  name: string;
  category: RoomCategory;
  description: string;
  dimension: number[];
}