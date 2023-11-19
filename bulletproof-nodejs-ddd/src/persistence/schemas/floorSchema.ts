import { IFloorPersistence } from "../../dataschema/IFloorPersistence";
<<<<<<< HEAD
import mongoose, { Schema } from "mongoose";

const FloorSchema = new mongoose.Schema({
    building: {
        type: Schema.Types.ObjectId,
        ref: 'Building',
        required: true,
      },
=======
import mongoose, { Schema, Document } from 'mongoose';
import { Building } from "../../domain/building";

const FloorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter a floor name'],
            index: true,
          },
          building: {
            type: Schema.Types.ObjectId, // Assuming building is referenced by its ObjectId
            ref: 'Building', // Replace 'Building' with the actual model name for buildings
          },
        description: {
            type: String,
            required: [true, 'Please enter the floor description'],
            index: true,
          },
      
        room: {
            type: Number,
            required: [true, 'Please enter the number of floors'],
            min: [1, 'At least one room is required'],
          },
      
        hall : {
            type: String,
            required: [true, 'Please enter the floor hall'],
            index: true,
          },
        floorMap: {
            type: String,
            required: [true, 'Please enter the floor map'],
            index: true,
          },
        hasElevator: {
            type: Boolean,
            index: true,
        }
        },
        { timestamps: true }
>>>>>>> f80e830f76b2629534815c22f83bf7f5327d6889
    
    name: {
        type: String,
        required: [true, 'Please enter a floor name'],
        index: true,
      },
  
    description: {
        type: String,
        required: [true, 'Please enter the floor description'],
        index: true,
      },
  
    room: {
        type: Number,
        required: [true, 'Please enter the number of floors'],
        min: [1, 'At least one room is required'],
      },
  
    hall : {
        type: String,
        required: [true, 'Please enter the floor hall'],
        index: true,
      },
    floorMap: {
        type: String,
        required: [true, 'Please enter the floor map'],
        index: true,
      },
      hasElevator: {
        type: Boolean,
        required: [true, 'Please specify whether the floor has an elevator'],
        index: true,
      },
      passages: [{
          type: Schema.Types.ObjectId,
          ref: 'Floor',
        },],
    },
    { timestamps: true }
);

export default mongoose.model<IFloorPersistence & mongoose.Document>('Floor',FloorSchema);