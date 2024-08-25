import express from 'express';

import Booking from '../models/Booking';
import {
  allBooking,
  createBooking,
  updateBooking,
  deleteBooking
} from '../controllers/booking';

const router = express.Router();

//get all
router.get('/', allBooking);

//create Booking
router.post('/:facilityId', createBooking);

//update one Booking
router.post('/:bookingId', updateBooking);

//delete Booking
router.delete('/:bookingId', deleteBooking);


export default router;
