import { Mapper } from "../core/infra/Mapper";
import { Document, Model } from 'mongoose';
import { ILiftPersistence } from '../dataschema/ILiftPersistence'; // Assuming this is the correct import
import ILiftDTO from "../dto/ILiftDTO";
import { Lift } from "../domain/lift";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class LiftMap extends Mapper<Lift> {
  public static toDTO(lift: Lift): ILiftDTO {
    return {
      _id: lift.id.toString(),
      localization: lift.localization,
      state: lift.state,
      building: lift.building, // You may need to adapt this depending on your data structure
    };
  }

  public static toDomain(lift: any | Model<ILiftPersistence & Document>): Lift {
    const liftOrError = Lift.create(
      lift,
      new UniqueEntityID(lift.domainId)
    );

    liftOrError.isFailure ? console.log(liftOrError.error) : '';

    return liftOrError.isSuccess ? liftOrError.getValue() : null;
  }

  public static toPersistence(lift: Lift): any {
    return {
      domainId: lift.id.toString(),
      localization: lift.localization,
      state: lift.state,
      building: lift.building, // You may need to adapt this depending on your data structure
    };
  }
}
