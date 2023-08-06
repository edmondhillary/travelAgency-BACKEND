import { Schema, model } from "mongoose";

const destinationSchema = new Schema(
  {
    name: { type: String, required: true },
    country: { type: String, required:true},
    description: { type: String, required: true },
    imageUrl:[ String],
    hashtags: [String]
    // Puedes agregar campos adicionales según tus necesidades
  },
  {
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true, versionKey: false },
  }
);


const destinationModel = model("Destination", destinationSchema);

export default destinationModel;
