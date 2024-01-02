import { TaskStatus } from "./taskStatus.enum";

export default interface taskVigilance {
  _id: string;
  userEmail: string;
  floor: string;
  description: string;
  phoneNumber: string;
  status: TaskStatus;
}