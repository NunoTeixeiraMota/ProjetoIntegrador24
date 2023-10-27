import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { liftId } from "./liftID";

import { Building } from "./building";
import ILiftDTO from "../dto/ILiftDTO";

interface LiftProps {
  _id: string;
	localization: string;
	state: string;
	building: Building;
}

export class Lift extends AggregateRoot<LiftProps> {

  set localization ( value: string) {
    this.props.localization = value;
  }
  set state ( value: string) {
    this.props.state = value;
  }
  set building ( value: Building) {
    this.props.building = value;
  }


  get id (): UniqueEntityID {
    return this._id;
  }

  get liftId (): liftId {
    return new liftId(this.liftId.toValue());
  }

  private constructor (props: LiftProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(liftDTO: ILiftDTO, id?: UniqueEntityID): Result<Lift> {
    const { _id, localization, state, building } = liftDTO;
  
    if (!_id || !_id.trim()) {
      return Result.fail<Lift>('Must provide a lift ID');
    }
  
    if (!localization || localization.trim() === "") {
      return Result.fail<Lift>('Must provide a lift localization');
    }
  
    if (!state || state.trim() === "") {
      return Result.fail<Lift>('Must provide a lift state');
    }
  
    if (!building) {
      return Result.fail<Lift>('Must provide a lift building');
    }
  
    const liftProps: LiftProps = {
      _id,
      localization,
      state,
      building,
    };
  
    const lift = new Lift(liftProps, id);
    return Result.ok<Lift>(lift);
  }
  
}
