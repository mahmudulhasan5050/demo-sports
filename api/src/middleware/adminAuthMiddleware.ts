import { Request, Response, NextFunction } from 'express';
import { ForbiddenError } from '../apiErrors/apiErrors';
import Users from '../models/User';
import User from '../models/User';

const adminAuthMiddleware = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const userId = req.user
    const adminUser = userId && await User.findById(userId)
    console.log("adminUser from admin middleware ",adminUser)
    
    if(adminUser && adminUser.role === 'admin'){
        console.log("admin next")
        next()
    }else{
        console.log("Forbidden")
        next(new ForbiddenError())
    }
};

export default adminAuthMiddleware