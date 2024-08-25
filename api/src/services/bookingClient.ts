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

export default {
    getAvailableTime
};
