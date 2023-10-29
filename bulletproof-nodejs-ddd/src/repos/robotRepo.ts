import { Service, Inject } from 'typedi';
import { Model, Document, FilterQuery } from 'mongoose';
import IRobotPersistance from '../dataschema/IRobotPersistance';
import { Robot } from '../domain/robot';
import { RobotMap } from '../mappers/robotMap';
import IRobotRepo from '../services/IRepos/IRobotRepo';

@Service()
export default class RobotRepo implements IRobotRepo {
  private models: Model<IRobotPersistance & Document>;

  constructor(
    @Inject('logger') private logger: any,
    @Inject('robotTypeSchema') private robotSchema: Model<IRobotPersistance & Document>
  ) {}
    exists(t: Robot): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

  async save(robot: Robot): Promise<Robot> {
    const query = {domainId: robot.id.toString()};

    const robotDocument = await this.robotSchema.findOne(query);
    const existingNickname = await this.robotSchema.findOne({ nickname: robot.nickname });
    const existingSerialNumber = await this.robotSchema.findOne({ serialNumber: robot.serialNumber });

    if(existingNickname != null || existingSerialNumber != null){
        throw new Error('Nickname or serial number already exist.');
    }

    try{
      if(robotDocument === null){
        const rawRobot: any = RobotMap.toPersistence(robot);
        const robotCreated = await this.robotSchema.create(rawRobot);
        return RobotMap.toDomain(robotCreated);
      }else{
        robotDocument.nickname = robot.nickname;
        robotDocument.type = robot.type;
        robotDocument.serialNumber = robot.serialNumber;
        robotDocument.description = robot.description;
        await robotDocument.save();

        return robot;
      }
    }catch(err){
      throw err;
    }

  }
}