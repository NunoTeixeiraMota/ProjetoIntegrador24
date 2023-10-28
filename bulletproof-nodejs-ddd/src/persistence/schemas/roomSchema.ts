import { IRoomPersistence } from '../../dataschema/IRoomPersistence';
import mongoose, { Schema } from 'mongoose';

const roomSchema = new mongoose.Schema(
  {
    id: { 
      type: String, 
      unique: true 
    },
    building: {
      type: Schema.Types.ObjectId,
      ref: 'building',
    },

    floor: {
      type: Schema.Types.ObjectId,
      ref: 'floor',
    },

    name: {
      type: String,
      required: [true, 'Please enter a valid name'],
      maxlength: [50, 'Cant excede 50 carachters'],
    },

    description: {
        type: String,
        required: [true, 'Please enter a valid description'],
        maxlength: [250, 'Cant excede 50 carachters'],
    },

    dimension: {
        type: [Number],
        required: [true, 'Please enter valid position and size'],
        validate: {
            validator: function (value) {
              if (!Array.isArray(value) || value.length !== 4) {
                return false;
              }
              const [x, y, width, height] = value;
              if (x < 0 || y < 0 || width < 1 || height < 1) {
                return false;
              }
              return true;
            },
            message: 'Please enter valid position and size',
          },
        },
    },
  { timestamps: true }
);

export default mongoose.model<IRoomPersistence & mongoose.Document>('room', roomSchema);