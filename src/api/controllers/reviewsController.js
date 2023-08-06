import * as reviewsRepo from '../repositories/reviewsRepo.js';

async function createReview(req, res) {
  try {
    const { trip, user, reviewText, rating } = req.body;
    const review = await reviewsRepo.createReview({ trip, user, reviewText, rating });

    res.json(review);
  } catch (error) {
    res.status(error.status || 500).json(error.message);
  }
}

async function getAllReviews(req, res) {
  try {
    const reviews = await reviewsRepo.getAllReviews();
    res.json(reviews);
  } catch (error) {
    res.status(error.status || 500).json(error.message);
  }
}

async function getReviewById(req, res) {
    const { id } = req.params;
    try {
      const review = await reviewsRepo.getReviewById(id);
      return res.json(review);
    } catch (error) {
      return res.status(error.status || 500).json(error.message);
    }
  }

async function updateReview(req, res) {
  const { id } = req.params;
  const fieldsToUpdate = req.body;
  try {
    const reviewUpdated = await reviewsRepo.updateReview({ id, fieldsToUpdate });
    res.json(reviewUpdated);
  } catch (error) {
    res.status(error.status || 500).json(error.message);
  }
}

async function deleteReview(req, res) {
  const { id } = req.params;
  try {
    const deletedReview = await reviewsRepo.deleteReviewById({ id });
    res.write(`Review with id: ${deletedReview._id} has been deleted`);
    res.end();
  } catch (error) {
    res.status(error.status || 500).json(error.message);
  }
}

export { createReview, getAllReviews, updateReview, deleteReview, getReviewById };
