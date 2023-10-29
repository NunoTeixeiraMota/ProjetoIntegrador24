import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { BuildingId } from "./buildingId"; // Define this class if necessary
import { Floor } from "./floor";

interface BuildingProps {
  name: string;
  localizationoncampus: string;
  floors: number;
  lifts: number;
  maxCel: number[];
  floorOnBuilding: Floor[];
}

export class Building extends AggregateRoot<BuildingProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get maxCel(): number[] {
    return this.props.maxCel;
  }
  get buildingId(): BuildingId {
    return new BuildingId(this.id.toValue());
  }

  get name(): string {
    return this.props.name;
  }

  get localizationoncampus(): string {
    return this.props.localizationoncampus;
  }

  get floorOnBuilding(): Floor[] {
    return this.props.floorOnBuilding;
  }

  get floors(): number {
    return this.props.floors;
  }

  get lifts(): number {
    return this.props.lifts;
  }

  set name(value: string) {
    this.props.name = value;
  }

  set localizationoncampus(value: string) {
    this.props.localizationoncampus = value;
  }

  set floors(value: number) {
    this.props.floors = value;
  }

  set lifts(value: number) {
    this.props.lifts = value;
  }

  set maxCel(value: number[]) {
    this.props.maxCel = value;
  }

  set floorOnBuilding(value: Floor[]) {
    this.props.floorOnBuilding = value;
  }

  private constructor(props: BuildingProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(buildingProps: BuildingProps, id?: UniqueEntityID): Result<Building> {
    const { name, localizationoncampus, floors, lifts, maxCel,floorOnBuilding } = buildingProps;

    if (!name || name.length === 0) {
      return Result.fail<Building>("Must provide a building name");
    } else if (!localizationoncampus || localizationoncampus.length === 0) {
      return Result.fail<Building>("Must provide a building localization on campus");
    } else if (floors <= 0) {
      return Result.fail<Building>("Number of floors must be greater than 0");
    } else if (lifts < 0) {
      return Result.fail<Building>("Number of lifts cannot be negative");
    } else if (maxCel.length === 0) {
      return Result.fail<Building>("Must provide a maxCel");
    } else if (floorOnBuilding.length !== floors) {
      return Result.fail<Building>("Floor ammount must be equal to floors array length");
    }
      else {
      const building = new Building(buildingProps, id);
      return Result.ok<Building>(building);
    }
  }
}
