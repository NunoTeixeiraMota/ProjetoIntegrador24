import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { FloorId } from "./floorId";
    
    
    interface FloorProps {
    name: string;
    description: string;
    hall: string;
    room: number;
    floorMap: string;
    hasElevator: boolean;
  }
  
  export class Floor extends AggregateRoot<FloorProps>{
    get id(): UniqueEntityID{
      return this._id;
    }
    get name(): string {
      return this.props.name;
    }
  
    get description(): string {
      return this.props.description;
    }
  
    get hall(): string {
      return this.props.hall;
    }
  
    get room(): number {
      return this.props.room;
    }
  
    get floorMap(): string {
      return this.props.floorMap;
    }
  
    get hasElevator(): boolean {
      return this.props.hasElevator;
    }
    private constructor (props: FloorProps, id? : UniqueEntityID){
      super (props, id);
    }
   public static create (FloorProps: FloorProps,id?: UniqueEntityID): Result<Floor>{
    const {name,description,hall,room,floorMap,hasElevator} = FloorProps;

    if (!name || name.length === 0) {
      return Result.fail<Floor>("Must provide a building name");
    } else if (!description || description.length === 0) {
      return Result.fail<Floor>("Empty description");
    } else if (!hall || hall.length === 0) {
      return Result.fail<Floor>("Must set the floor's hall");
    } else if (room < 1) {
      return Result.fail<Floor>("Must provide floor's rooms");
    } else {
      const floor = new Floor(FloorProps,id);
      return Result.ok<Floor>(floor);
    }
    
  }
}