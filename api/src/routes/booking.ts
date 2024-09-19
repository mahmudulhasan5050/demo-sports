import express from 'express';

import {
  allBooking,
  createAdminBooking,
  updateBooking,
  deleteBooking,
  getBookingById,
  getBookingByDate
} from '../controllers/booking';

const router = express.Router();

//get all
router.get('/', allBooking);

//get by id
router.get('/:bookingId', getBookingById)

//get booking by date
router.get('/booking-by-date/:date', getBookingByDate)

//create Booking
router.post('/', createAdminBooking);

//update one Booking
router.post('/:bookingId', updateBooking);

//delete Booking
router.delete('/:bookingId', deleteBooking);


export default router;
