import mongoose from 'mongoose';
import { IBooking } from '../models/Booking';

// Function to generate time slots in 30-minute intervals
export const generateTimeSlots = (open: string, close: string): string[] => {
  const slots: string[] = [];
  let [openHour, openMinute] = open.split(':').map(Number);
  let [closeHour, closeMinute] = close.split(':').map(Number);

  let [openHour1, openMinute1] = open.split(':');
  console.log(openHour, ':', openMinute);
  console.log(openHour1, ':', openMinute1);

  while (
    openHour < closeHour ||
    (openHour === closeHour && openMinute < closeMinute)
  ) {
    slots.push(
      `${String(openHour).padStart(2, '0')}:${String(openMinute).padStart(
        2,
        '0'
      )}`
    );
    openMinute += 30;

    if (openMinute >= 60) {
      openMinute = 0;
      openHour += 1;
    }
  }

  return slots;
};

// Function to filter out slots that overlap with existing bookings
export const filterAvailableSlots = (
  slots: string[],
  bookings: IBooking[],
  facilities: mongoose.Types.ObjectId[]
): string[] => {
  return slots.filter((slot) => {
    // For each slot, check if there is at least one facility that is not booked
    const isSlotAvailable = facilities.some((facilityId) => {
      // Check if this facility is booked during the current slot
      const isFacilityBooked = bookings.some((booking) => {
        const bookingStart = booking.startTime;
        const bookingEnd = addMinutes(bookingStart, booking.duration);

        // Check if the slot overlaps with the booking for this facility
        return (
          booking.facility.equals(facilityId) &&
          slot >= bookingStart &&
          slot < bookingEnd
        );
      });

      // If the facility is not booked for this slot, return true to indicate the slot is available
      return !isFacilityBooked;
    });

    return isSlotAvailable; // Slot remains available if at least one facility is unbooked
  });
};

// Function to add minutes to a time string (hh:mm)
const addMinutes = (time: string, minutes: number): string => {
  let [hour, minute] = time.split(':').map(Number);
  minute += minutes;

  if (minute >= 60) {
    hour += Math.floor(minute / 60);
    minute %= 60;
  }

  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
};
