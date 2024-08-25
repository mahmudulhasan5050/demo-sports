import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getToken, removeToken } from '../utils/localStorageFunc';
import AvatarDropdown from './AvatarDropdown';
import Logo from './Logo';
import Nav from './Nav';
import { useUser } from '../context/UserContext';


export const Header = () => {
  const {user, setUser} = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (token) {
      setUser({ name: token.name, email: token.email });
    }
  });

  const handleLogout = () => {
    removeToken();
    setUser(null);
  };

  return (
    <header className='sticky top-0 z-10 mx-auto flex w-full max-w-7xl items-center justify-between border-b border-gray-100 bg-white p-4 font-sans text-gray-700 shadow-md'>
      <Logo />
      <Nav />
      <div className='flex items-center space-x-4'>
        {user ? (
          <AvatarDropdown user={user} onLogout={handleLogout} />
        ) : (
          <button
            onClick={() => navigate('/signin')}
            className='rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
