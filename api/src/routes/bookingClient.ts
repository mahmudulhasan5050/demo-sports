import express from 'express';

import Booking from '../models/Booking';
import {
  getAvailableTime,
  getAvailableCourt
} from '../controllers/bookingClient';

const router = express.Router();

//get available time according to the date and facility name comes with req.body
router.post('/available-time', getAvailableTime);

// get available court according to date, facility and time
router.post('/available-court', getAvailableCourt)

export default router;
