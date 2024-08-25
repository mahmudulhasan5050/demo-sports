import React, { useState } from 'react';

import FacilityUnitDisplay from '../../components/admin/facilityUnit/FacilityUnitDisplay';
import FacilityUnitForm from '../../components/admin/facilityUnit/FacilityUnitForm';

const FacilityUnitMain = () => {
  const [refresh, setRefresh] = useState(false);

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
          Create New Facility Unit
        </button>
      </div>

      <div className='flex justify-center items-start'>
        <div className='w-full max-w-5xl bg-white p-8 rounded-lg shadow-md'>
          {!refresh ? (
            <FacilityUnitDisplay refresh={refresh} setRefresh={setRefresh} />
          ) : (
            <FacilityUnitForm setRefresh={setRefresh} />
          )}
        </div>
      </div>
    </div>
  );
};

export default FacilityUnitMain;
