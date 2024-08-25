import express from 'express';

import FacilityUnit from '../models/FacilityUnit';
import { allFacilityUnit,createFacilityUnit, updateFacilityUnit,deleteFacilityUnit } from '../controllers/facilityUnit';


const router = express.Router()

//get all
router.get('/', allFacilityUnit)

//create facilityUnit
router.post('/', createFacilityUnit)

//update one facilityUnit
router.post('/:facilityUnitId', updateFacilityUnit)

//delete facilityUnit
router.delete('/:facilityUnitId', deleteFacilityUnit)

export default router