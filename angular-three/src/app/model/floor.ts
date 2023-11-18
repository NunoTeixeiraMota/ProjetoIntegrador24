import Building from "./building";

export default interface floor {
    id: string;
    name: string;
    description: string;
    hall: string;
    room: number;
    floorMap: string;
    hasElevator: boolean;
    building: Building
    passages: floor[];
}