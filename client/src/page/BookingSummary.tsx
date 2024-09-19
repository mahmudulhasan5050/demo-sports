import { useEffect, useState } from 'react'
import { useUser } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { axiosBookingCreate } from '../axios'
import toast from 'react-hot-toast'
import { BookingObjCTXType } from '../types/bookingNUser'

const BookingSummary = () => {
    const bookingInfoStr = localStorage.getItem('booking')
    const [bookingInfo, setBookingInfo] = useState<BookingObjCTXType | null>(bookingInfoStr ? JSON.parse(bookingInfoStr) : null)
    const { user, bookingDetailsCTX, setBookingDetailsCTX } = useUser() // Added setBookingDetailsCTX to update context
    const navigate = useNavigate()

    if (!bookingInfo) {
        navigate('/')
    }
    if (user?.role === 'member' && bookingInfo) {
        bookingInfo.email = user.email
        bookingInfo.isPaid = true
        bookingInfo.paymentAmount = 0
    }

    const confirmHandle = async () => {
        if (bookingInfo) {
            try {
                const res = await axiosBookingCreate(bookingInfo.facilityId, bookingInfo)
                if (res.data) {
                    toast.success('Booking successful')
                    navigate('/booking-success')
                }
            } catch (error) {
                toast.error('Booking is not possible!')
            }
        }
    }

    const paymentHandle = async () => {
        // Simulate payment process
        console.log('Payment process!!!!!')
        if (bookingInfo && user) {
            try {
                // Simulating payment success
                bookingInfo.email = user.email
                bookingInfo.isPaid = true

                // Update context to trigger UI change
                setBookingInfo({ ...bookingInfo, isPaid: true })

                toast.success('Payment successful')
            } catch (error) {
                toast.error('Payment failed!')
            }
        }
    }

    return (
        <div className="min-h-screen w-screen flex justify-center">
                <div className="bg-white flex flex-col w-full px-4 md:w-1/2 text-center mt-48">
                    <h2 className="text-2xl font-bold mb-4">Booking Summary</h2>
                    <p>
                        <strong>Facility:</strong> {bookingInfo?.facilityName}
                    </p>
                    <p>
                        <strong>Date:</strong> {bookingInfo?.date}
                    </p>
                    <p>
                        <strong>Time:</strong>{' '}
                        {bookingInfo?.time.slice(0, 2) + ':' + bookingInfo?.time.slice(2)}
                    </p>
                    <p>
                        <strong>Duration:</strong> {bookingInfo?.duration} hour(s)
                    </p>
                    <p>
                        <strong>Total Cost:</strong> {bookingInfo?.paymentAmount} euro(s)
                    </p>

                    {/* For Members: Show only the "Confirm Booking" button */}
                    {user?.role === 'member' && (
                        <button
                            onClick={confirmHandle}
                            className="mt-4 bg-blue-500 text-white font-bold py-2 p-4 rounded hover:bg-blue-700"
                        >
                            Confirm Booking
                        </button>
                    )}

                    {/* For Non-Members: Show "Pay Now" button first, then "Confirm Booking" after payment */}
                    {user?.role === 'non-member' && !bookingInfo?.isPaid && (
                        <button
                            className="mt-4 bg-green-500 text-white font-bold py-2 p-4 rounded hover:bg-green-700"
                            onClick={paymentHandle}
                        >
                            Pay Now
                        </button>
                    )}
                    {user?.role === 'non-member' && bookingInfo?.isPaid && (
                        <button
                            onClick={confirmHandle}
                            className="mt-4 bg-blue-500 text-white font-bold py-2 p-4 rounded hover:bg-blue-700"
                        >
                            Confirm Booking
                        </button>
                    )}
                </div>
        </div>
    )
}

export default BookingSummary
