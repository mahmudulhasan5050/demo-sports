// UserContext.tsx
import React, { createContext, useState, useContext } from 'react';
import { UserCTXType, BookingObjCTXType } from '../types/bookingNUser';

interface UserContextType {
  user: UserCTXType | null;
  setUser: (user: UserCTXType | null) => void;
  bookingDetailsCTX: BookingObjCTXType | null;
  setBookingDetailsCTX: (bookingDetailsCTX: BookingObjCTXType | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserCTXType | null>(null);
  const [bookingDetailsCTX, setBookingDetailsCTX] =
    useState<BookingObjCTXType | null>(null);

  return (
    <UserContext.Provider
      value={{ user, setUser, bookingDetailsCTX, setBookingDetailsCTX }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
