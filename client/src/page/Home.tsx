import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { firstLetterUpperCase } from '../utils/upperLowerConvert';
import { axiosFetchFacilityUnits } from '../axios/index';

const Home = () => {
  const navigate = useNavigate();
  const [facilityUnit, setFacilityUnit] = useState<any[]>([]); // Assuming the facilities data is an array, adjust the type accordingly

  useEffect(() => {
    const fetchFacilityUnits = async () => {
      try {
        const response = await axiosFetchFacilityUnits();
        setFacilityUnit(response.data); // Assuming response.data contains the facilities
      } catch (error) {
        console.error('Error fetching facilities:', error);
      }
    };

    fetchFacilityUnits(); // Call the async function
  }, []);

  return (
    <div>
      {facilityUnit.length !== 0 ? (
        <div>
          {facilityUnit.map((facility) => (
            <div key={facility._id}>
              <p >
                {firstLetterUpperCase(facility.name)}
              </p>
              <button
                onClick={() => {
                  navigate(`/booking-client/${facility.name}`);
                }}
              >click here</button>
            </div>
          ))}
        </div>
      ) : (
        <div>No facility</div>
      )}
    </div>
  );
};

export default Home;
