import { Service, Inject } from 'typedi';
import { RobotType } from '../domain/robotType';
import { Model, Document, FilterQuery } from 'mongoose';
import { IRobotTypePersistance } from '../dataschema/IRobotTypePersistance';
import { RobotTypeMap } from '../mappers/robotTypeMap';
import IRobotTypeRepo from '../services/IRepos/IRobotTypeRepo';

@Service()
export default class RobotTypeRepo implements IRobotTypeRepo {
  constructor(
    @Inject('logger') private logger: any,
    @Inject('robotTypeSchema') private robotTypeSchema: Model<IRobotTypePersistance & Document>
  ) {}
  exists(t: RobotType): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async save(robotType: RobotType): Promise<RobotType> {
    const query = {domainId: robotType.id.toString()};

    const robotTypeDocument = await this.robotTypeSchema.findOne(query);

    try{
      if(robotTypeDocument === null){
        const rawRobotType: any = RobotTypeMap.toPersistence(robotType);
        const robotTypeCreated = await this.robotTypeSchema.create(rawRobotType);
        return RobotTypeMap.toDomain(robotTypeCreated);
      }else{
        robotTypeDocument.designation = robotType.designation;
        robotTypeDocument.brand = robotType.brand;
        robotTypeDocument.modelRobot = robotType.modelRobot;
        robotTypeDocument.task = robotType.task;
        await robotTypeDocument.save();

        return robotType;
      }
    }catch(err){
      throw err;
    }

  }
  
  async findByDesignation(designation: string): Promise<RobotType> {
    const query = {domainId: designation};
    const robotTypeRecord = await this.robotTypeSchema.findOne(query as FilterQuery<IRobotTypePersistance & Document>);

    if(robotTypeRecord != null){
      return
    }else{
      return null;
    }
  }
}