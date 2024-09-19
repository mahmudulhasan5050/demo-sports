import { Request, Response, NextFunction } from 'express';
import bookingServices from '../services/bookingClientFinal';

import Booking from '../models/Booking';
import {
  AlreadyExistError,
  BadRequestError,
  NotFoundError
} from '../apiErrors/apiErrors';
import Facility from '../models/Facility';
import {addMinutes} from '../utils/timeSlotHelper'
import mongoose from 'mongoose';
import User from '../models/User';


//create booking
export const createBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const facilityId = req.params.facilityId;
  const { email, date, time, duration, paymentAmount, isPaid } = req.body;

  //check facilityId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(facilityId)) {
    throw new BadRequestError('Invalid facility ID');
  }
  try {
    //check facilityId exist'
    const facilityExist = await Facility.findById(facilityId);
    const userExist = await User.findOne({email})
    if(!userExist) throw new NotFoundError()
    console.log('facilityExist: ', facilityExist);
    // check existance
    const isExist = await Booking.findOne({
      facility: facilityId,
      date: date,
      startTime: time,
    });
    if (isExist) throw new AlreadyExistError();

    //create new facility according to user input
    const endTime = addMinutes(time,duration)
    
    console.log("endTime", endTime)
    const newBooking = new Booking({
      user: userExist._id,
      facility: facilityId,
      date: date,
      startTime: time,
      endTime: endTime,
      duration: duration,
      paymentAmount,
      isPaid
    });

    // call service function to save in database¨
    const createSuccess = await bookingServices.createBooking(newBooking);
    res.status(200).json(createSuccess);
  } catch (error) {
    next(new BadRequestError('Can not create booking', error));
  }
};



export const deleteBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //get id from params
    const bookingId = req.params.bookingId;

    await bookingServices.deleteBooking(bookingId);
    res.status(204).end();
  } catch (error) {
    next(new BadRequestError('Can not delete.....', error));
  }
};


