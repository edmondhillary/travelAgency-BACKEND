import reviewModel from "../models/reviewsSchema.js";
import tripModel from "../models/tripsSchema.js";
import { Types } from "mongoose";
const { ObjectId } = Types;

async function createReview({ trip, user, reviewText, rating }) {
  const review = await reviewModel.create({ trip, user, reviewText, rating });

  // Agregar el ID de la nueva review al array de reviews del trip
  const tripId = review.trip;
  await tripModel.findByIdAndUpdate(tripId, { $push: { reviews: review._id } });

  return review;
}


async function getReviewById(id) {
  const query = { _id: new ObjectId(id) };
  const review = await reviewModel.findById(query).populate('user trip');
  return review;
}


async function getAllReviews() {
  const reviews = await reviewModel.find({}).populate('trip user');
  return reviews;
}

async function updateReview({ id, fieldsToUpdate }) {
  const query = { _id: new ObjectId(id) };
  const updateBody = { $set: fieldsToUpdate };

  const reviewToUpdate = await reviewModel.findOneAndUpdate(query, updateBody, {
    new: true,
  });
  return reviewToUpdate;
}

async function deleteReviewById({ id }) {
  try {
    // Buscar la review por su _id
    const deletedReview = await reviewModel.findOneAndDelete({ _id: new ObjectId(id) });

    if (!deletedReview) {
      throw new Error("Review not found");
    }

    // Obtener el _id del trip asociado a la review
    const tripId = deletedReview.trip;

    // Eliminar el _id de la review del array de reviews del trip
    await tripModel.findByIdAndUpdate(
      tripId,
      { $pull: { reviews: new ObjectId(id) } },
      { new: true }
    );

    return deletedReview;
  } catch (error) {
    throw new Error("Error deleting review");
  }
}

export { createReview, getAllReviews, updateReview, deleteReviewById,getReviewById };
