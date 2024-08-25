import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

import { Facility } from '../../../types/Facility';
import { FacilityUnit } from '../../../types/FacilityUnit';
import {
  axiosCreateFacility,
  axiosFetchFacilityUnits,
  axiosFetchFacilityById,
  axiosUpdateFacility,
} from '../../../axios';

type setRefreshType = {
  facilityId: string;
  setFacilityId: (value: string) => void;
  setRefresh: (value: boolean) => void;
};

const FacilityForm = ({
  facilityId,
  setFacilityId,
  setRefresh,
}: setRefreshType) => {
  const [formData, setFormData] = useState<Facility>({
    type: '',
    courtNumber: 0,
    pricePerHour: 0,
  });
  const [facilityUnit, setFacilityUnit] = useState<FacilityUnit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacilityUnits = async () => {
      try {
        const facilityUnits = await axiosFetchFacilityUnits();
        setFacilityUnit(facilityUnits.data);
      } catch (error) {
        console.error('Error fetching facility units:', error);
      }
    };

    fetchFacilityUnits();
  }, []);

  //edit
  useEffect(() => {
    // If editing, fetch the existing facility data
    const fetchFacility = async () => {
      if (facilityId !== '') {
        try {
          console.log('facility inside useeffect', facilityId);
          const response = await axiosFetchFacilityById(facilityId);
          setFormData(response.data); // Pre-fill the form with the fetched data
        } catch (error) {
          console.error('Error fetching facility:', error);
        }
      }
      setLoading(false);
    };
    fetchFacility();
  }, [facilityId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (facilityId !== '') {
        // Update existing facility
        await axiosUpdateFacility(facilityId, formData);
        toast.success('Facility has been updated successfully!');
      } else {
        //create facility
        await axiosCreateFacility(formData);
        toast.success('Facility has been created successfully!');
      }

      setRefresh(false);
      setFacilityId('');
    } catch (err) {
      toast.error('Failed to create Facility. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-8 rounded-lg shadow-md w-full'
      >
        <h2 className='text-2xl font-bold text-gray-700 mb-6 text-center'>
          Create Facility
        </h2>

        {/* Facility Name */}
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='name'
          >
            Facility Type
          </label>
          <select
            id='type'
            name='type'
            value={formData.type}
            onChange={handleChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            required
          >
            <option value=''>Select Type</option>
            {facilityUnit.length !== 0 &&
              facilityUnit.map((facilityName) => (
                <option key={facilityName.name} value={facilityName.name}>
                  {facilityName.name}
                </option>
              ))}
          </select>
        </div>

        {/* Court Number */}
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='name'
          >
            Court Number
          </label>
          <input
            id='courtNumber'
            name='courtNumber'
            type='number'
            value={formData.courtNumber}
            onChange={handleChange}
            placeholder='Enter price per hour'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            required
          />
        </div>

        {/* Price */}
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='name'
          >
            Price/h
          </label>
          <input
            id='pricePerHour'
            name='pricePerHour'
            type='number'
            value={formData.pricePerHour}
            onChange={handleChange}
            placeholder='Enter price per hour'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            required
          />
        </div>

        {/* Submit Button */}
        <div className='flex items-center justify-center'>
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FacilityForm;
