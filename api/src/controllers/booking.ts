import { Request, Response, NextFunction } from 'express';
import bookingServices from '../services/booking';

import Booking from '../models/Booking';
import {
  AlreadyExistError,
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from '../apiErrors/apiErrors';
import Facility from '../models/Facility';
import mongoose from 'mongoose';
import User from '../models/User';
import { addMinutes } from '../utils/timeSlotHelper';


//get all booking
export const allBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('all controller');
  try {
    const findAllBookings = await bookingServices.allBooking();
    res.status(200).json(findAllBookings);
  } catch (error) {
    next(new BadRequestError('Invalid Request', error));
  }
};

//get by id
export const getBookingById = async(
  req: Request,
  res: Response,
  next: NextFunction
)=>{
const bookingId = req.params.bookingId
try {
  const bookingByIdSuccess = await bookingServices.getBookingById(bookingId)
  res.status(200).json(bookingByIdSuccess)
} catch (error) {
  next(new BadRequestError('Invalid Request', error));
}
}

//get Booking by date
export const getBookingByDate = async(
  req: Request,
  res: Response,
  next: NextFunction
)=>{
  const date = req.params.date
  console.log("date   ",date)
  try {
    
    const bookingByDateSuccess = await bookingServices.getBookingByDate(date)
    console.log("bookingByDateSuccess ", bookingByDateSuccess)
    res.status(200).json(bookingByDateSuccess)
  } catch (error) {
    next(new BadRequestError('Date is not valid', error))
  }
}


//create booking
export const createAdminBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const { email, facilityId, date, startTime, duration } = req.body;

  // //check facilityId is a valid ObjectId
  // if (!mongoose.Types.ObjectId.isValid(facilityId)) {
  //   throw new BadRequestError('Invalid facility ID');
  // }
  try {
    //check facilityId exist'
    const facilityExist = await Facility.findById(facilityId);
    if(!facilityExist){next(new NotFoundError())}
    const userExist = await User.findOne({email})
    if(!userExist){next(new NotFoundError())}

    console.log('facilityExist: ', facilityExist);
    // check existance
    const isExist = await Booking.findOne({
      facility: facilityId,
      date: date,
      startTime: startTime,
    });
    if (isExist){next(new AlreadyExistError())};

    const endTime = addMinutes(startTime, duration)

    //create new facility according to user input
    const newBooking = new Booking({
      user: userExist?._id,
      facility: facilityId,
      date: date,
      startTime: startTime,
      endTime: endTime,
      isPaid: true,
      paymentAmount: 0,
      duration: duration,
    });

    // call service function to save in database¨
    const createSuccess = await bookingServices.createAdminBooking(newBooking);
    res.status(200).json(createSuccess);
  } catch (error) {
    next(new BadRequestError('Can not create booking', error));
  }
};

//update booking
export const updateBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //get id from params
    const bookingId = req.params.bookingId;
    //get updated info from body
    const updatedBookingFromBody = req.body;

    // check existance
    const isExist = await Booking.findById(bookingId);
    if (!isExist) throw new NotFoundError();

    const updateSuccess = await bookingServices.updateBooking(
      bookingId,
      updatedBookingFromBody
    );

    res.status(204).json(updateSuccess);
  } catch (error) {
    next(new ForbiddenError('Can not update', error));
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


