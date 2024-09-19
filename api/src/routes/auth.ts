import express from 'express';

import {
    signUp,
    confirmEmail,
    signIn
  
} from '../controllers/auth';

const router = express.Router();

router.post('/signup', signUp);
router.get('/confirm/:token', confirmEmail)
router.post('/signin', signIn);


  

export default router;