import { Service, Inject } from 'typedi';
import { Document, FilterQuery, Model } from 'mongoose';
import ILiftRepo from './IRepos/ILiftRepo';
import { Lift } from '../domain/lift';
import { liftId } from '../domain/liftID';
import { LiftMap } from '../mappers/LiftMap';
import { ILiftPersistence } from '../dataschema/ILiftPersistence';

@Service()
export default class LiftRepo implements ILiftRepo {
  constructor(
    @Inject('liftSchema') private liftSchema: Model<ILiftPersistence & Document>,
  ) {}

  private createBaseQuery(): any {
    return {
      where: {},
    };
  }

  public async exists(lift: Lift): Promise<boolean> {
    const idX = lift.id instanceof liftId ? (lift.id as liftId).toValue() : lift.id;

    const query = { domainId: idX };
    const liftDocument = await this.liftSchema.findOne(query as FilterQuery<ILiftPersistence & Document>);

    return !!liftDocument === true;
  }

  public async save(lift: Lift): Promise<Lift> {
    const query = { _id: lift.id };
    const liftDocument = await this.liftSchema.findOne(query);

    try {
      if (liftDocument === null) {
        const rawLift: any = LiftMap.toPersistence(lift);
        const liftCreated = await this.liftSchema.create(rawLift);
        return LiftMap.toDomain(liftCreated);
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId(liftId: liftId | string): Promise<Lift> {
    const query = { _id: liftId };
    const liftRecord = await this.liftSchema.findOne(query as FilterQuery<ILiftPersistence & Document>);

    if (liftRecord != null) {
      return LiftMap.toDomain(liftRecord);
    } else {
      return null;
    }
  }
}
