//import React, { useState } from 'react';

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { firstLetterUpperCase } from '../../utils/upperLowerConvert';
import { User } from '../../types/User';
import { axiosFetchUsers, axiosDeleteUser } from '../../axios';

//import UserDisplay from '../../components/admin/user/UserDisplay';
//import UserForm from '../../components/admin/openingHour/OpeningHourForm';

const UserMain = () => {
  //const [userId, setUserId] = useState<string>('');
  //---------------------------------
  const [users, setUsers] = useState<User[]>([]);

  // Fetch User when component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosFetchUsers();
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching opening hour:', error);
      }
    };

    fetchUsers();
  }, []);

  // Handle delete 
  const handleDelete = async (id: string) => {
    try {
      const res = await axiosDeleteUser(id);
      console.log(res.data)
      // Update the UI after deletion
      setUsers(users.filter((unit) => unit._id !== id));
      toast.success('User has been deleted!');
    } catch (error) {
      toast.error('User can not be deleted.');
    }
  };

  //--------------------------------

  return (
    <div className='relative min-h-screen bg-gray-100'>
      <div className='flex justify-center items-start'>
        <div className='w-full max-w-5xl bg-white p-8 rounded-lg shadow-md'>
        <h2 className='text-2xl font-bold text-gray-700 mb-6 text-center'>
        Users
      </h2>

      <div className='w-full max-w-5xl bg-white p-8 rounded-lg shadow-md'>
        {users.length === 0 ? (
          <p className='text-center text-gray-600'>No User Available</p>
        ) : (
          <table className='min-w-full bg-white'>
            <thead>
              <tr>
                <th className='py-2 px-4 border-b'>Name</th>
                <th className='py-2 px-4 border-b'>Email</th>
                <th className='py-2 px-4 border-b'>Role</th>
                <th className='py-2 px-4 border-b'>Payment</th>
                <th className='py-2 px-4 border-b'>Verified</th>
              </tr>
            </thead>
            <tbody>
              {users.map((unit) => (
                <tr key={unit._id}>
                  <td className='py-2 px-4 border-b'>
                    {firstLetterUpperCase(unit.name)}
                  </td>
                  <td className='py-2 px-4 border-b'>{unit.email}</td>
                  <td className='py-2 px-4 border-b'>{unit.role && firstLetterUpperCase(unit.role)}</td>
                  <td className='py-2 px-4 border-b'>{unit.isPaid ? 'Paid' : 'N'}</td>
                  <td className='py-2 px-4 border-b'>{unit.isValid ? 'Verified': 'N'}</td>
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
       
          {/* <UserDisplay setUserId={setUserId} /> */}
        </div>
      </div>
    </div>
  );
};

export default UserMain;
