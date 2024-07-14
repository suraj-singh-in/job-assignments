// dummyModel.ts
import { Schema, model, Document, Types } from "mongoose";

// Define the interface for the document
export interface CoinDocument extends Document {
  code: string;
  name: string;
  rate: number;
  volume?: number;
  cap?: number;
  symbol?: string;
  color?: string;
}

// Define the schema
const coinSchema = new Schema<CoinDocument>(
  {
    code: { type: String, required: true },
    name: { type: String, required: true },
    rate: { type: Number, required: true },
    volume: { type: Number },
    cap: { type: Number },
    symbol: { type: String },
    color: { type: String },
  },
  {
    timestamps: true,
  }
);

// Create and export the model
const DummyModel = model<CoinDocument>("Coin", coinSchema);

export default DummyModel;
