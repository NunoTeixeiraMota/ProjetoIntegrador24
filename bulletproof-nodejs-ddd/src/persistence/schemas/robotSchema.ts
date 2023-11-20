import mongoose, { Schema } from 'mongoose';
import IRobotPersistance from '../../dataschema/IRobotPersistance';

const RobotSchema = new mongoose.Schema(
  {
    id: { 
      type: String, 
      unique: true
    },
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

      isActive: {
          type: Boolean,
          required: [true, 'Please enter the state of the robot'],
          index: true,
        },
  },
  { timestamps: true }
);

export default mongoose.model<IRobotPersistance & mongoose.Document>('Robot', RobotSchema);