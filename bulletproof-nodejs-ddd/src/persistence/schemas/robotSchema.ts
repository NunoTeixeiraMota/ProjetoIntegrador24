import mongoose, { Schema } from 'mongoose';
import IRobotPersistance from '../../dataschema/IRobotPersistance';

const RobotSchema = new mongoose.Schema(
  {
    nickname: {
      type: String,
      required: [true, 'Please enter the nickname of the robot'],
      index: true,
      maxlength: [30, 'Cant excede 30 carachters'],
    },

    type: {
        type: Schema.Types.ObjectId,
        ref: 'robotType',
    },

    serialNumber: {
      type: String,
      required: [true, 'Please enter the serial number of the robot'],
      index: true,
      maxlength: [50, 'Cant excede 50 carachters'],
    },

    description: {
        type: String,
        required: [true, 'Please enter the description of the robot'],
        index: true,
        maxlength: [250, 'Cant excede 250 carachters'],
      },
  },
  { timestamps: true }
);

export default mongoose.model<IRobotPersistance & mongoose.Document>('Robot', RobotSchema);