import express from 'express';
import * as reviewsController from '../controllers/reviewsController.js'

const router = express.Router();
router.post('/', reviewsController.createReview)
router.get('/', reviewsController.getAllReviews)
router.get('/id/:id', reviewsController.getReviewById )
router.put('/:id', reviewsController.updateReview)
router.delete('/:id', reviewsController.deleteReview)

export default router;
