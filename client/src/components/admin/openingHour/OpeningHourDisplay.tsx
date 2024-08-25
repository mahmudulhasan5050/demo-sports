import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { firstLetterUpperCase } from '../../../utils/upperLowerConvert';
import { OpeningHour } from '../../../types/OpeningHour';
import { axiosFetchOpeningHour, axiosDeleteOpeningHour } from '../../../axios';

type setRefreshType = {
  refresh: boolean;
  setOpeningHourtId: (value: string) => void;
  setRefresh: (value: boolean) => void;
};

const OpeningHourDisplay = ({
  refresh,
  setOpeningHourtId,
  setRefresh,
}: setRefreshType) => {
  const [openingHour, setOpeningHour] = useState<OpeningHour[]>([]);

  // Fetch Facility when component mounts
  useEffect(() => {
    const fetchOpeningHour = async () => {
      try {
        const response = await axiosFetchOpeningHour();
        setOpeningHour(response.data);
      } catch (error) {
        console.error('Error fetching opening hour:', error);
      }
    };

    fetchOpeningHour();
  }, [refresh]);

  // Handle delete facility
  const handleDelete = async (id: string) => {
    try {
      await axiosDeleteOpeningHour(id);
      // Update the UI after deletion
      setOpeningHour(openingHour.filter((unit) => unit._id !== id));
      toast.success('Facility has been deleted!');
    } catch (error) {
      toast.error('Facility can not be deleted.');
    }
  };

  return (
    <div>
      <h2 className='text-2xl font-bold text-gray-700 mb-6 text-center'>
        Opening Hours
      </h2>

      <div className='w-full max-w-5xl bg-white p-8 rounded-lg shadow-md'>
        {openingHour.length === 0 ? (
          <p className='text-center text-gray-600'>No Facility Available</p>
        ) : (
          <table className='min-w-full bg-white'>
            <thead>
              <tr>
                <th className='py-2 px-4 border-b'>Day</th>
                <th className='py-2 px-4 border-b'>Open</th>
                <th className='py-2 px-4 border-b'>Close</th>
              </tr>
            </thead>
            <tbody>
              {openingHour.map((unit) => (
                <tr key={unit._id}>
                  <td className='py-2 px-4 border-b'>
                    {firstLetterUpperCase(unit.day)}
                  </td>
                  <td className='py-2 px-4 border-b'>{unit.open}</td>
                  <td className='py-2 px-4 border-b'>{unit.close}</td>
                  <td className='py-2 px-4 border-b'>
                    <button
                      onClick={() => {
                        unit._id && setOpeningHourtId(unit._id);
                        setRefresh(true);
                      }}
                      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline'
                    >
                      Edit
                    </button>
                  </td>
                  <td className='py-2 px-4 border-b'>
                    <button
                      onClick={() => unit._id && handleDelete(unit._id)}
                      className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OpeningHourDisplay;
