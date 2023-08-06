import express from 'express';
import * as bookingsController from '../controllers/bookingsController.js';

const router = express.Router();
router.post('/', bookingsController.createBooking)
router.get('/', bookingsController.getAllBookings)
router.get('/id/:id', bookingsController.getById)
router.put('/:id', bookingsController.updateBooking)
router.delete('/:id', bookingsController.deleteBooking)

export default router;
