import tripModel from "../models/tripsSchema.js";
import { Types } from "mongoose";
import reviewModel from "../models/reviewsSchema.js";
const { ObjectId } = Types;

async function insert(newTrip) {
  const trip = await tripModel.create(newTrip);
  return trip;
}

async function getAllTrips() {
  const trips = await tripModel.find({}).populate('destinations');
  return trips;
}

async function getTripById(id) {
  const query = { _id: new ObjectId(id) };
  const trip = await tripModel.findById(query).populate('destinations reviews');
  return trip;
}

async function updateTrip({ id, fieldsToUpdate }) {
  const query = { _id: new ObjectId(id) };
  const updateBody = { $set: fieldsToUpdate };

  const tripToUpdate = await tripModel.findOneAndUpdate(query, updateBody, {
    new: true,
  });
  return tripToUpdate;
}

async function deleteTripById({ id }) {
  try {
    // Buscar las reviews asociadas al trip
    const reviewsToDelete = await reviewModel.find({ trip: id });

    // Borrar las reviews encontradas
    for (const review of reviewsToDelete) {
      await reviewModel.deleteOne({ _id: review._id });
    }

    // Borrar el trip
    const deletedTrip = await tripModel.findOneAndDelete({ _id: id });

    return deletedTrip;
  } catch (error) {
    throw new Error("Error deleting trip and associated reviews");
  }
}

export { insert, getAllTrips, updateTrip, deleteTripById, getTripById };
