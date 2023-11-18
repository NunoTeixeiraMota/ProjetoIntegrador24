export default interface floor {
    id: string;
    name: string;
    description: string;
    hall: string;
    room: number;
    floorMap: string;
    hasElevator: boolean;
    passages: floor[];
}