import React, { useState, useEffect } from 'react'
import { useUser } from '../../../context/UserContext'
import Modal from './Modal'
import { axiosDeleteBookingByUser, axiosFetchBookingsByUser } from '../../../axios'
import { Facility } from '../../../types/Facility'
import toast from 'react-hot-toast'

interface OwnBooking {
    _id: string
    date: string
    startTime: string
    facility: Facility
    duration: number
}
interface PropsType {
    isOpen: boolean
    onClose: () => void
}

const OwnScheduleModal = ({ isOpen, onClose }: PropsType) => {
    const [bookings, setBookings] = useState<OwnBooking[]>([])
    const { user } = useUser()

    useEffect(() => {
        const fetchUserBookingData = async () => {
            if (isOpen) {
                try {
                    const res = user && (await axiosFetchBookingsByUser(user.email))
                    setBookings(res?.data)
                } catch (error) {
                    console.log('error for fetching data')
                }
            }
        }

        fetchUserBookingData()
    }, [isOpen, user])

    const handleCancel = async(bookingId: string) => {
        try {
            await axiosDeleteBookingByUser(bookingId)
            toast.success('Your booking is cancelled.')
        } catch (error) {
            toast.error('Can not be cancelled. ')
        }
        // Logic to cancel the booking
        console.log(`Booking ${bookingId} canceled`)
        // Here you could make a request to your API to cancel the booking.
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-xl font-bold mb-4">Your Bookings</h2>
            <div className="max-h-96 overflow-y-auto">
                {bookings.length > 0 ? (
                    <ul className="space-y-4">
                        {bookings.map((booking, index) => (
                            <li key={index} className="p-2 border rounded shadow-sm">
                                <p>
                                    <strong>Facility:</strong> {booking.facility.type} - {booking.facility.courtNumber}
                                </p>
                                <p>
                                    <strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}
                                </p>
                                <p>
                                    <strong>Time:</strong> {booking.startTime.slice(0, 2) + ':' + booking.startTime.slice(2)}
                                </p>
                                <p>
                                    <strong>Duration:</strong> {booking.duration} hour(s)
                                </p>
                                <button
                                    onClick={() => handleCancel(booking._id)} // Or another unique identifier
                                    className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-700"
                                >
                                    Cancel
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No bookings found.</p>
                )}
            </div>
        </Modal>
    )
}

export default OwnScheduleModal
