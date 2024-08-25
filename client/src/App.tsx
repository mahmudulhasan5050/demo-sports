import React from 'react';
import './App.css';
import './index.css';
import { Routes, Route } from 'react-router-dom';

import { UserProvider } from './context/UserContext';
import Home from './page/Home';
import Header from './components/Header';
import Booking from './page/BookingClient';
import FacilityUnitMain from './page/admin/FacilityUnitMain';
import FacilityMain from './page/admin/FacilityMain';
import OpeningHourMain from './page/admin/OpeningHourMain';
import UserMain from './page/admin/UserMain';
import SignUp from './page/SighUp';
import ConfirmEmail from './page/admin/ConfirmEmail';
import SignIn from './page/SignIn';
import CheckYourEmail from './components/CheckYourEmail';
import BookingMain from './page/admin/BookingMain';

function App() {
  return (
    <UserProvider>
      <div className='App'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/booking-client/:facilityName' element={<Booking />} />

          {/* Admin */}
          <Route path='/booking/:facilityId' element={<BookingMain />} />
          <Route path='/facilityunit' element={<FacilityUnitMain />} />
          <Route path='/facility' element={<FacilityMain />} />
          <Route path='/openinghour' element={<OpeningHourMain />} />
          <Route path='/user' element={<UserMain />} />

          {/* Authentication */}
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/auth/confirm/:token' element={<ConfirmEmail />} />
          <Route path='/check-your-email' element={<CheckYourEmail />} />
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;
