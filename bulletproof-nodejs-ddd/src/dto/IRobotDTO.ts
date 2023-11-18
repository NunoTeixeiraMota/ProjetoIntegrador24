import { RobotType } from "../domain/robotType";

export default interface IRobotDTO {
    id: string;
    isActive: boolean;
    nickname: string;
    type: RobotType;
    serialNumber: string;
    description: string;
}