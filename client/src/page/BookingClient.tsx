import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import { todayToString, count15DaysFromToday } from '../utils/dates';
import { axiosAvailableTime, axiosAvailableCourt, axiosBookingCreate } from '../axios';
import { Facility } from '../types/Facility';
import Loading from '../components/Loading';
import ErrorComp from '../components/ErrorComp';

export type FacilityNDateObjType = {
  selectedDate: string;
  facilityName: string;
  selectedTime?: string;
};
export type BookingObjType = {
  date: string;
  time: string;
  duration: number;
};

const BookingClient = () => {
  const [date, setDate] = useState<string>(todayToString);
  const [availableTime, setAvailableTime] = useState<string[]>([]);
  const [availableCourts, setAvailableCourts] = useState<Facility[]>([]);

  const [facilityId, setFacilityId] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [duration, setDuration] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  const { facilityName } = useParams<{ facilityName: string }>();

  useEffect(() => {
    const facilityNDateObj = {
      selectedDate: date,
      facilityName: facilityName!,
    } as FacilityNDateObjType;

    try {
      const getAvailableTime = async () => {
        try {
          setLoading(true);
          //axios parameter: selectedDate:string, facilityName:string
          const res = await axiosAvailableTime(facilityNDateObj);
          setAvailableTime(res.data.availableTime);
          setAvailableCourts([]);
          setTime('');
          setFacilityId('');
          setDuration(0);
        } catch (error) {
          setError('Failed to fetch available times');
        } finally {
          setLoading(false);
        }
      };
      getAvailableTime();
    } catch (error) {}
  }, [date, facilityName]);

 //select time and get available facility
  const handleTimeSlotClick = async (selectedTime: string) => {
    try {
      setLoading(true);
      const facilityNDateObj = {
        selectedDate: date,
        facilityName: facilityName!,
        selectedTime,
      } as FacilityNDateObjType;

      const res = await axiosAvailableCourt(facilityNDateObj);
      setTime(selectedTime);
      setAvailableCourts(res.data.availableCourts);
    } catch (error) {
      setError('Failed to fetch available courts');
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };
  // handle court to get facilityId. In database, it is called 'facility'
  const courtHandle = (courtId: string) => {
    setFacilityId(courtId);
  };
  //handle duration
  const durationHandle = (givenDuration: number) => {
    setDuration(givenDuration);
  };

  const handleBooking = async() => {
    if (time !== '' && duration !== 0 && facilityId !== '') {
      try {
        const bookingObj = {
          date,
          time,
          duration,
        } as BookingObjType;
        const res = await axiosBookingCreate(facilityId, bookingObj)
        console.log(res.data)
      } catch (error) {
        setError('Failed to book your time');
      }
    } else {
      toast('Please check your selection to book.');
    }
  };
  console.log('date ', date);
  console.log('time ', time);
  console.log('facility ', facilityId);
  console.log('duration ', duration);

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4'>
      <form className='bg-white w-full md:w-1/2 p-8 rounded-lg shadow-md mb-8'>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Select Date
          </label>
          <input
            type='date'
            value={date}
            onChange={handleDateChange}
            min={todayToString()} // Disable past dates
            max={count15DaysFromToday()} // Disable dates after 15 days
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>
      </form>
      {loading && <Loading />} {/* Show loading spinner if loading */}
      {error && <ErrorComp message={error} />}{' '}
      {/* Show error message if error */}
      {!loading && !error && availableTime.length === 0 && (
        <p className='text-gray-500'>No available time slots.</p>
      )}
      <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4'>
        {availableTime.map((timeSlot, index) => (
          <button
            key={index}
            className='bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700'
            onClick={() => handleTimeSlotClick(timeSlot)} // Future functionality
          >
            {timeSlot}
          </button>
        ))}
      </div>
      {availableCourts.length > 0 && (
        <div className='mt-8'>
          <h2 className='text-xl font-bold mb-4'>Available Courts</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {availableCourts.map((court, index) => (
              <button
                key={index}
                onClick={() => court._id && courtHandle(court._id)}
                className='bg-green-500 text-white font-bold py-2 px-4 rounded text-center'
              >
                <h3>
                  {court.type}-{court.courtNumber}
                </h3>
                <p>{court.pricePerHour} euros</p>
              </button>
            ))}
          </div>
          <button
            onClick={() => durationHandle(30)}
            className='bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700'
          >
            30 minutes
          </button>
          <button
            onClick={() => durationHandle(60)}
            className='bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700'
          >
            60 minutes
          </button>
          <button
            onClick={() => durationHandle(90)}
            className='bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700'
          >
            90 minutes
          </button>
        </div>
      )}
      <div className='mb-4'>
        <button
          className='bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700'
          onClick={handleBooking}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default BookingClient;
