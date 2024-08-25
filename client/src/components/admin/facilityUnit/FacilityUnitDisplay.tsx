import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { firstLetterUpperCase } from '../../../utils/upperLowerConvert';
import { FacilityUnit } from '../../../types/FacilityUnit';
import {
  axiosFetchFacilityUnits,
  axiosDeleteFacilityUnit,
} from '../../../axios';

type setRefreshType = {
  refresh: boolean;
  setRefresh: (value: boolean) => void;
};

const FacilityUnitDisplay = ({ refresh, setRefresh }: setRefreshType) => {
  const [facilityUnits, setFacilityUnits] = useState<FacilityUnit[]>([]);

  // Fetch Facility Units when component mounts
  useEffect(() => {
    const fetchFacilityUnits = async () => {
      try {
        const response = await axiosFetchFacilityUnits();
        console.log('response.data ', response.data);
        setFacilityUnits(response.data);
      } catch (error) {
        console.error('Error fetching facility units:', error);
      }
    };

    fetchFacilityUnits();
  }, [refresh]);

  // Handle delete facility unit
  const handleDelete = async (id: string) => {
    try {
      await axiosDeleteFacilityUnit(id);
      // Update the UI after deletion
      setFacilityUnits(facilityUnits.filter((unit) => unit._id !== id));
      toast.success('Facility unit has been deleted!');
    } catch (error) {
      console.error('Error deleting facility unit:', error);
    }
  };

  return (
    <div>
      <h2 className='text-2xl font-bold text-gray-700 mb-6 text-center'>
        Facility Units
      </h2>

      <div className='w-full max-w-5xl bg-white p-8 rounded-lg shadow-md'>
        {facilityUnits.length === 0 ? (
          <p className='text-center text-gray-600'>
            No Facility Units Available
          </p>
        ) : (
          <table className='min-w-full bg-white'>
            <thead>
              <tr>
                <th className='py-2 px-4 border-b'>Name</th>
                <th className='py-2 px-4 border-b'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {facilityUnits.map((unit) => (
                <tr key={unit._id}>
                  <td className='py-2 px-4 border-b'>
                    {firstLetterUpperCase(unit.name)}
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

export default FacilityUnitDisplay;
