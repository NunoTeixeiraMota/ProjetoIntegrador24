import { TaskStatus } from "./taskStatus.enum";

export default interface taskPickDelivery {
  _id: string; 
  userEmail: string;
  namePickup: string;
  nameDelivery: string;
  codeDelivery: number;
  floor: string;
  room: string[];
  description: string;
  status: TaskStatus;
}