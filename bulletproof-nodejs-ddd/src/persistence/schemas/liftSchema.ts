import mongoose, { Schema, Document } from 'mongoose';
import { ILiftPersistence } from '../../dataschema/ILiftPersistence';

// Define the Lift schema
const Lift = new mongoose.Schema(
  {
  domainId: {
    type: String,
    unique: true,
    required: true,
  },
  localization: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  building: {
    type: Schema.Types.ObjectId, // Assuming building is referenced by its ObjectId
    ref: 'Building', // Replace 'Building' with the actual model name for buildings
  },
}, { timestamps: true });

// Create and export the Lift model based on the schema
export default mongoose.model<ILiftPersistence & Document>('Lift', Lift);

