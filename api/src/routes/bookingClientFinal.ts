import express from 'express';

import Booking from '../models/Booking';
import {
  createBooking,
  deleteBooking
} from '../controllers/bookingClientFinal';

const router = express.Router();

//create Booking
router.post('/:facilityId', createBooking);


//Cancel Booking
router.delete('/:bookingId', deleteBooking);


export default router;
