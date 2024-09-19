import express from 'express';

import {
  createBooking,
  deleteBooking
} from '../controllers/bookingClientFinal';
import userAuthMiddleware from '../middleware/userAuthMiddleware';

const router = express.Router();

//create Booking
router.post('/:facilityId', userAuthMiddleware, createBooking);


//Cancel Booking
router.delete('/:bookingId', deleteBooking);


export default router;
