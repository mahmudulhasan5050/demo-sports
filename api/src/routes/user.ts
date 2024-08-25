import express from 'express';

import User from '../models/User';
import { allUsers,getUserById, createUser,updateUser,deleteUser } from '../controllers/user';


const router = express.Router()

//get all
router.get('/', allUsers)
//get by id
router.get('/:userId', getUserById)

//create 
//this api is available in auth
//------ router.post('/', createUser)

//update
router.post('/:userId', updateUser)

//delete 
router.delete('/:userId', deleteUser)

export default router