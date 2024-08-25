import React, { useState } from 'react';

import OpeningHourDisplay from '../../components/admin/openingHour/OpeningHourDisplay';
import OpeningHourForm from '../../components/admin/openingHour/OpeningHourForm';

const OpeningHourMain = () => {
  const [refresh, setRefresh] = useState(false);
  const [openingHourtId, setOpeningHourtId] = useState<string>('');

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
          Create opening hour
        </button>
      </div>

      <div className='flex justify-center items-start'>
        <div className='w-full max-w-5xl bg-white p-8 rounded-lg shadow-md'>
          {!refresh ? (
            <OpeningHourDisplay
            setOpeningHourtId={setOpeningHourtId}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          ) : (
            <OpeningHourForm
            openingHourtId={openingHourtId}
            setOpeningHourtId={setOpeningHourtId}
              setRefresh={setRefresh}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default OpeningHourMain;
