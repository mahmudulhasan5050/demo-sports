import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getToken, removeToken } from '../../../utils/cookiesFunc';
import AvatarDropdown from '../AvatarDropdown';
import Logo from '../Logo';
import Nav from '../Nav';
import { useUser } from '../../../context/UserContext';

export const HeaderClient = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (token) {
      setUser({ name: token.name, email: token.email, role: token.role });
    }
  },[setUser]);

  const handleLogout = () => {
    removeToken();
    setUser(null);
  };

  return (
    <header className='mx-auto flex w-full max-w-7xl items-center justify-between p-4 text-gray-700 bg-white'>
      <Logo />
      {user && user.role === 'admin' && <Nav />}
      
      <div className='flex items-center'>
        {user ? (
          <AvatarDropdown user={user} handleLogout={handleLogout} />
        ) : (
          <button
            onClick={() => navigate('/signin')}
            className='bg-gradient-to-tl from-orange-300 to-orange-700 rounded-lg px-4 py-2 text-white hover:from-orange-900 hover:to-orange-400'
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default HeaderClient;
