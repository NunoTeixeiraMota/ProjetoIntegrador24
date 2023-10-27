import { IFloorPersistence } from "../../dataschema/IFloorPersistence";
import mongoose from "mongoose";

const FloorSchema = new mongoose.Schema(
    {
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
        FloorMap: {
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
    
);

export default mongoose.model<IFloorPersistence & mongoose.Document>('Floor',FloorSchema);

