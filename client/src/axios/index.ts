import { API } from './axiosUrl';
import { FacilityUnit } from '../types/FacilityUnit';
import { Facility } from '../types/Facility';
import { OpeningHour } from '../types/OpeningHour';
import { User, SignInType } from '../types/User';
import { BookingObjType, FacilityNDateObjType } from '../page/BookingClient';

//facility
export const axiosFetchFacility = async () => await API.get('/facility');
//opening hours
export const axiosFetchOpeningHour = async () => await API.get('/openinghour');
//signup
export const axiosCreateUser = async (newUser: User) =>
  await API.post('/auth/signup', newUser);
//confirm email
export const axiosEmailConfirm = async (token: string) =>
  await API.get(`/auth/confirm/${token}`);
//signin
export const axiosSignIn = async (user: SignInType) =>
  await API.post('/auth/signin', user);
//booking client------------
//find available time.Param: facility and date (object body)
export const axiosAvailableTime = async (bodyObject: FacilityNDateObjType) =>
  await API.post('/booking-client/available-time', bodyObject);
export const axiosAvailableCourt = async (bodyObject: FacilityNDateObjType) =>
  await API.post('/booking-client/available-court', bodyObject);


//login required
export const axiosBookingCreate = async(facililyId: string, bookingObj: BookingObjType) => await API.post(`/booking-client-final/${facililyId}`, bookingObj) 

//admin
export const axiosCreateFacilityUnit = async (facilityUnit: FacilityUnit) =>
  await API.post('/facilityunit', facilityUnit);
export const axiosFetchFacilityUnits = async () =>
  await API.get('facilityunit');
export const axiosDeleteFacilityUnit = async (facilityUnitId: string) =>
  await API.delete(`/facilityunit/${facilityUnitId}`);

export const axiosDeleteFacility = async (facililyId: string) =>
  await API.delete(`/facility/${facililyId}`);
export const axiosCreateFacility = async (newFicility: Facility) =>
  await API.post('/facility', newFicility);
export const axiosFetchFacilityById = async (facilityId: string) =>
  await API.get(`/facility/${facilityId}`);
export const axiosUpdateFacility = async (
  facilityId: string,
  editFacility: Facility
) => await API.post(`/facility/${facilityId}`, editFacility);

//opening hour
export const axiosDeleteOpeningHour = async (openingHourtId: string) =>
  API.delete(`/openinghour/${openingHourtId}`);
export const axiosFetchOpeningHourById = async (openingHourtId: string) =>
  API.get(`/openinghour/${openingHourtId}`);
export const axiosUpdateOpeningHour = async (
  openingHourtId: string,
  editOpeningHour: OpeningHour
) => API.post(`/openinghour/${openingHourtId}`, editOpeningHour);
export const axiosCreateOpeningHour = async (newOpeningHour: OpeningHour) =>
  API.post('/openinghour', newOpeningHour);

// users
export const axiosFetchUsers = async () => API.get('/user');
export const axiosDeleteUser = async (userId: string) =>
  API.delete(`/user/${userId}`);
