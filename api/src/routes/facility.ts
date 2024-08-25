import express from 'express';

import Facility from '../models/Facility';
import { allFacility,createFacility, updateFacility,deleteFacility,getFacilityById } from '../controllers/facility';


const router = express.Router()

//get all
router.get('/', allFacility)
//get by id
router.get('/:facilityId', getFacilityById)

//create facility
router.post('/', createFacility)

//update one facility
router.post('/:facilityId', updateFacility)

//delete facility
router.delete('/:facilityId', deleteFacility)

export default router