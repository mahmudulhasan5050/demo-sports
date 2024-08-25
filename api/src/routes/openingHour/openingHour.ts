import express from 'express';

import OpeningHour from '../../models/OpeningHour';
import {
  allOpeningHours,
  getOpeningHourById,
  createOpeningHour,
  updateOpeningHour,
  deleteOpeningHour,
} from '../../controllers/openingHour/openingHour';

const router = express.Router();

//get all
router.get('/', allOpeningHours);
//get by id
router.get('/:openinghourId', getOpeningHourById);

//create facility
router.post('/', createOpeningHour);

//update one facility
router.post('/:openingHourId', updateOpeningHour);

//delete facility
router.delete('/:openingHourId', deleteOpeningHour);

export default router;
