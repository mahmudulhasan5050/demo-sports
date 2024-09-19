import mongoose from 'mongoose';
import { NotFoundError } from '../apiErrors/apiErrors';
import Booking, { IBooking } from '../models/Booking';

// get available time
const getAvailableTime = async(facilityIds:mongoose.Types.ObjectId[],selectedDate:string) =>{
  //IMPORTANT: date:selectedDate might cause error------------------------//////
  const bookings = await Booking.find({
    facility: { $in: facilityIds },
    date: selectedDate,
  });
  
  return bookings
}

// get bookings by user
const getUserBooking = async(userId: mongoose.Types.ObjectId) =>{
  try {
    // Assuming you have a Booking model that relates to users
    const bookings = await Booking.find({ user: userId }).populate('facility', 'type courtNumber');
    return bookings;
  } catch (error) {
    throw new Error('Error fetching bookings'); // Handle errors appropriately
  }
}

//delete
const deleteBookingByUser = async (bookingId: string) => {
  
  const deleteFromDatabase = await Booking.findByIdAndDelete(bookingId);

  if (!deleteFromDatabase) throw new NotFoundError('Facility is not found');
  return deleteFromDatabase;
};

export default {
    getAvailableTime,
    getUserBooking,
    deleteBookingByUser
};
