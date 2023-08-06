import { Schema, model } from "mongoose";

const tripSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    destinations: [{
      type: Schema.Types.ObjectId,
      ref: 'Destination'
    }],
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    price: {
      type: Number,
      required: true,
    },
    availableSeats: {
      type: Number,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrls: [String],
    reviews: [{
      type: Schema.Types.ObjectId, 
      ref: 'Review'
    }],
    hashtags: [String],
    ecoRating: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true, versionKey: false },
  }
);

const tripModel = model("Trip", tripSchema);

export default tripModel;
