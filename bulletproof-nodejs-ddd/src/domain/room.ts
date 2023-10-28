import { Building } from "./building";
import { Floor } from "./floor";
import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";

export enum RoomCategory {
    Gabinete = "Gabinete",
    Anfiteatro = "Anfiteatro",
    Laboratório = "Laboratório",
    Outro = "Outro",
}

interface RoomProps {
    building: Building;
    floor: Floor;
    name: string;
    category: RoomCategory;
    description: string;
    dimension: number[]; //x,y,width,height
}

export class room extends AggregateRoot<RoomProps> {
  get id(): UniqueEntityID {
    return this.id;
  }

  public building(): Building {
    return this.props.building;
  }

  public floor(): Floor {
    return this.props.floor;
  }

  public name(): string {
    return this.props.name;
  }

  public category(): RoomCategory {
    return this.props.category;
  }

  public description(): string {
    return this.props.description;
  }

  public dimension(): number[] {
      return this.props.dimension;
  }

  private constructor(props: RoomProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(roomProps: RoomProps, id?: UniqueEntityID): Result<room> {
      const { building, floor, name, category, description, dimension} = roomProps;

      if (!building) {
        return Result.fail<room>("Must provide a valid building");
      } else if (!floor) {
        return Result.fail<room>("Must provide a valid floor");
      } else if (!name || name.length > 50) {
        return Result.fail<room>("Must provide a valid name (Max: 50 characters)");
      } else if (!description || description.length > 250) {
        return Result.fail<room>("Must provide a valid description (Max: 250 characters)");
      } else if (dimension[0] < 0 || dimension[1] < 0 || dimension[2] < 1 || dimension[3] < 1){
        return Result.fail<room>("Must provide a valid dimensions for the room (Min: 1 cell)");
      } else {
        const room1 = new room(roomProps);
        return Result.ok<room>(room1);
      }
  }
}