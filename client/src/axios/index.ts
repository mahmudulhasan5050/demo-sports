import { API } from './axiosUrl'
import customAxios from './axiosConfig'
import { FacilityUnit } from '../types/FacilityUnit'
import { Facility } from '../types/Facility'
import { OpeningHour } from '../types/OpeningHour'
import { User, SignInType } from '../types/User'
import { AxiosRequestForFetchDataType } from '../types/AxiosRequestForFetchData'
import { BookingCreateType } from '../types/Booking'
import { BookingObjCTXType } from '../types/bookingNUser'

//auth
export const axiosCreateUser = async (newUser: User) => await API.post('/auth/signup', newUser) //signup (create user)
export const axiosEmailConfirm = async (token: string) => await API.get(`/auth/confirm/${token}`) //confirm email
export const axiosSignIn = async (user: SignInType) => await API.post('/auth/signin', user) //signin

//When user is trying to create a booking
//find available time.Param: facility and date (object body)
export const axiosAvailableTime = async (bodyObject: AxiosRequestForFetchDataType) =>
    await API.post('/booking-client/available-time', bodyObject)
export const axiosAvailableCourt = async (bodyObject: AxiosRequestForFetchDataType) =>
    await API.post('/booking-client/available-court', bodyObject)
export const axiosAvailableDuration = async (bodyObject: AxiosRequestForFetchDataType) =>
    await API.post('/booking-client/available-duration', bodyObject)

// When user is submitting for final booking
export const axiosBookingCreate = async (facililyId: string, bookingObj: BookingObjCTXType) =>
    await customAxios.post(`/booking-client-final/${facililyId}`, bookingObj)
export const axiosFetchBookingsByUser = async(userEmail:string)=>
    await customAxios.get(`/booking-client/booking-for-user/${userEmail}`)
export const axiosDeleteBookingByUser = async(bookingId:string)=>
    await customAxios.delete(`/booking-client/${bookingId}`)


//admin
//facility Unit CRUD
export const axiosCreateFacilityUnit = async (facilityUnit: FacilityUnit) =>
    await API.post('/facilityunit', facilityUnit)
export const axiosFetchFacilityUnits = async () => await API.get('facilityunit')
export const axiosDeleteFacilityUnit = async (facilityUnitId: string) =>
    await API.delete(`/facilityunit/${facilityUnitId}`)

//facility CRUD
export const axiosFetchFacility = async () => await API.get('/facility')
export const axiosDeleteFacility = async (facililyId: string) => await API.delete(`/facility/${facililyId}`)
export const axiosCreateFacility = async (newFicility: Facility) => await API.post('/facility', newFicility)
export const axiosFetchFacilityById = async (facilityId: string) => await API.get(`/facility/${facilityId}`)
export const axiosUpdateFacility = async (facilityId: string, editFacility: Facility) =>
    await API.post(`/facility/${facilityId}`, editFacility)

//opening hour CRUD
export const axiosFetchOpeningHour = async () => await API.get('/openinghour')
export const axiosDeleteOpeningHour = async (openingHourtId: string) => API.delete(`/openinghour/${openingHourtId}`)
export const axiosFetchOpeningHourById = async (openingHourtId: string) => API.get(`/openinghour/${openingHourtId}`)
export const axiosUpdateOpeningHour = async (openingHourtId: string, editOpeningHour: OpeningHour) =>
    API.post(`/openinghour/${openingHourtId}`, editOpeningHour)
export const axiosCreateOpeningHour = async (newOpeningHour: OpeningHour) => API.post('/openinghour', newOpeningHour)

//booking CRUD
export const axiosFetchBookings = async () => await API.get('/booking')
// export const axiosFetchBookingById = async(bookingId:string)=>
//     await API.get(`/booking/${bookingId}`) // This is for Edit booking
export const axiosAdminCreateBooking = async(bookingObjAdmin:BookingCreateType) =>
    await API.post(`/booking`, bookingObjAdmin)
export const axiosDeleteBooking = async (id: string) => await API.get(`/booking/${id}`)
export const axiosGetBookingByDate = async(date: string) =>
    await API.get(`/booking/booking-by-date/${date}`)


// users
export const axiosFetchUsers = async () => API.get('/user')
export const axiosDeleteUser = async (userId: string) => API.delete(`/user/${userId}`)
