import mongoose, { Document } from "mongoose";

export interface IHistorial extends Document {
  repo: string;
  timeData: Date;
}

const historialSchema = new mongoose.Schema({
  repo: String,
  timeData: Date,
});

const Historial = mongoose.model<IHistorial>("Historial", historialSchema);

export default Historial;