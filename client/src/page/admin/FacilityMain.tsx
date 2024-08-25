import React, { useState } from 'react';

import FacilityDisplay from '../../components/admin/facility/FacilityDisplay';
import FacilityForm from '../../components/admin/facility/FacilityForm';

const FacilityMain = () => {
  const [refresh, setRefresh] = useState(false);
  const [facilityId, setFacilityId] = useState<string>('');

  const toggleHandle = () => {
    setRefresh(!refresh);
  };

  return (
    <div className='relative min-h-screen bg-gray-100'>
      <div className='flex justify-end p-4'>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          onClick={toggleHandle}
        >
          Create Facility Details
        </button>
      </div>

      <div className='flex justify-center items-start'>
        <div className='w-full max-w-5xl bg-white p-8 rounded-lg shadow-md'>
          {!refresh ? (
            <FacilityDisplay
              setFacilityId={setFacilityId}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          ) : (
            <FacilityForm
              facilityId={facilityId}
              setFacilityId={setFacilityId}
              setRefresh={setRefresh}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FacilityMain;
