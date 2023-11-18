import Building from "./building";

export default interface floor {
    id: string;
    name: string;
    building: Building
    description: string;
    hall: string;
    room: number;
    floorMap: string;
    hasElevator: boolean;
    passages: floor[];
}