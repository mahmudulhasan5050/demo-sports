import mongoose from 'mongoose';
import { NotFoundError } from '../apiErrors/apiErrors';
import Booking, { IBooking } from '../models/Booking';

//get all
const allBooking = () => {
  return Booking
  .find()
  .populate('user', 'name email role')
  .populate('facility', 'type courtNumber');
};

//Get by id
const getBookingById = async(bookingId: string)=>{
  return await Booking
  .findById(bookingId).populate('user', 'email')
  .populate('facility', 'type courtNumber')
}

//get by date
const getBookingByDate = async(date: string) =>{
return await Booking
.find({date})
.populate('user', 'name email role')
.populate('facility', 'type courtNumber')
}

//create
const createAdminBooking = async (newBooking: IBooking) => {
  const saveBooking = await newBooking.save();
  return saveBooking;
};

//update
const updateBooking = async (
  bookingId: string,
  updatedBookingFromBody: IBooking
) => {
  const findAndUpdate = await Booking.findByIdAndUpdate(
    bookingId,
    updatedBookingFromBody,
    { new: true }
  );
  if (!findAndUpdate)
    throw new NotFoundError('Can not update booking information!!');
  return findAndUpdate;
};

//delete
const deleteBooking = async (bookingId: string) => {
  
  const deleteFromDatabase = await Booking.findByIdAndDelete(bookingId);

  if (!deleteFromDatabase) throw new NotFoundError('Facility is not found');
  return deleteFromDatabase;
};

export default {
    allBooking,
    getBookingById,
    getBookingByDate,
    createAdminBooking,
    updateBooking,
    deleteBooking
};
