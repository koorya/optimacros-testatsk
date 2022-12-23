import mongoose, { InferSchemaType, Schema } from "mongoose";

export const carSchema = new Schema({
  brand: { type: String, required: true },
  name: { type: String, required: true },
  production_year: {
    type: Number,
    required: true,
    min: [1900, "Must be at least 1900, got {VALUE}"],
    max: [3000, "Must be tiny than 3000, got {VALUE}"],
  },
  price: { type: Number, required: true },
});

export const Car = mongoose.model("Car", carSchema);

export type CarType = InferSchemaType<typeof carSchema>;
