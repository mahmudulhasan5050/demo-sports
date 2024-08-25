import { Request, Response, NextFunction } from 'express';
import bookingClientServices from '../services/bookingClient';

import Booking from '../models/Booking';
import {
  AlreadyExistError,
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from '../apiErrors/apiErrors';
import Facility from '../models/Facility';
import mongoose from 'mongoose';
import OpeningHour from '../models/OpeningHour';
import {
  filterAvailableSlots,
  generateTimeSlots,
} from '../utils/timeSlotHelper';

// get available time
export const getAvailableTime = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { selectedDate, facilityName } = req.body;
  try {
    console.log('selectedDate ', selectedDate, ':::', facilityName);
    if (!selectedDate || !facilityName) {
      return res
        .status(400)
        .json({ error: 'Date and facility name are required' });
    }

    // Parse date and find the day of the week
    const convertStringToDate = new Date(selectedDate as string);
    const findDayStringFromDate = convertStringToDate
      .toLocaleString('en-US', { weekday: 'long' })
      .toLowerCase();
    //console.log("findDayStringFromDate ",findDayStringFromDate)
    // Find the facility by name
    const facility = await Facility.find({ type: facilityName });
    if (!facility) {
      return res.status(404).json({ error: 'Facility not found' });
    }
    const facilityIds = facility.map(
      (faci) => faci._id
    ) as mongoose.Types.ObjectId[];

    // Find the opening hours for the given day
    const openingHour = await OpeningHour.findOne({
      day: findDayStringFromDate,
    });
    if (!openingHour) {
      return res
        .status(404)
        .json({ error: 'Opening hours not found for the selected day' });
    }

    const timeSlots = generateTimeSlots(openingHour.open, openingHour.close);
    //console.log('availableSlots ', availableSlots);

    const bookingsSuccess = await bookingClientServices.getAvailableTime(
      facilityIds,
      selectedDate
    );
    console.log('bookingsSuccess', bookingsSuccess);
    // Filter out booked slots
    const filteredSlots = filterAvailableSlots(timeSlots, bookingsSuccess, facilityIds);
    console.log('filteredSlots ', filteredSlots);
    res.status(200).json({ availableTime: filteredSlots });
  } catch (error) {
    next(new BadRequestError('Invalid Request', error));
  }
};

// find available court
export const getAvailableCourt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { facilityName, selectedDate, selectedTime } = req.body;
  try {
    // Find the facility by name
    const facilities = await Facility.find({ type: facilityName }).exec();
    if (!facilities || facilities.length === 0) {
      return res.status(404).json({ error: 'Facility not found' });
    }
    console.log('facilities ', facilities);
    const facilityIds = facilities.map((facility) => facility._id);
    console.log('facilityIds ', facilityIds);
    // Find bookings for the selected date and time
    const bookedFacilities = await Booking.find({
      facility: { $in: facilityIds },
      date: selectedDate,
      startTime: selectedTime,
    }).select('facility');

    const bookedFacilityIds = bookedFacilities.map(
      booking => booking.facility
    );
   console.log("bookedFacilityIds ",bookedFacilityIds)
    // Filter out booked facilities
    const availableCourts = facilities.filter(
      facility => !bookedFacilityIds.includes(facility._id as mongoose.Types.ObjectId)
    );

    console.log("---------------------------- ")
    console.log("availableCourts ",availableCourts)
    res.status(200).json({ availableCourts });
  } catch (error) {
    next(new BadRequestError('Invalid Request', error));
  }
};
