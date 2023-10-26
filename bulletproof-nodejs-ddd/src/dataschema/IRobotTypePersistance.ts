export interface IRobotTypePersistance {
    designation: string;
    brand: string;
    model: string;
    task: number; //0 - vigilance 1 - pickup & delivery 2 - both
}