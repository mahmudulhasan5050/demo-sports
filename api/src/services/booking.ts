import mongoose from 'mongoose';
import { NotFoundError } from '../apiErrors/apiErrors';
import Booking, { IBooking } from '../models/Booking';

//get all
const allBooking = () => {
  return Booking.find();
};

//create
const createBooking = async (newBooking: IBooking) => {
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
    createBooking,
    updateBooking,
    deleteBooking
};
