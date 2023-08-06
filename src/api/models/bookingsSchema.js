import { Schema, model } from "mongoose";

const bookingSchema = new Schema(
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
    bookingDate: {
      type: Date,
      default: Date.now,
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ["Paid", "Unpaid"],
    },
  },
  {
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true, versionKey: false },
  }
);

const bookingModel = model("Booking", bookingSchema);

export default bookingModel;
