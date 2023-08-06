import { Schema, model } from "mongoose";

const reviewSchema = new Schema(
  {
    trip: {
      type: Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true, versionKey: false },
  }
);

const reviewModel = model("Review", reviewSchema);

export default reviewModel;
