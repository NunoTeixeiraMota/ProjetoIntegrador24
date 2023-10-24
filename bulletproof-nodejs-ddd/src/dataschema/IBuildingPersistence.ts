export interface IBuildingPersistence {
    buildingId: string; // You can define the data type based on your identifier (e.g., UUID, string, etc.).
    name: string;
    localizationoncampus: string;
    floors: number;
    lifts: number;
  }
  