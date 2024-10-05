import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode';

import { saveToken, Token } from '../../utils/cookiesFunc'
import { useUser } from '../../context/UserContext'

const AuthSuccess = () => {
    const navigate = useNavigate()
    const {userCTX,setUserCTX} = useUser()

    useEffect(() => {
        // Extract token from URL
        const params = new URLSearchParams(window.location.search)
        const token = params.get('token')
    console.log("token ::::: n", token)
        if (token) {
 
            console.log("decodeToken", token)  
           saveToken(token)
        //    setUserCTX({
        //     name: token,
        //     role: token
        // })
        const localStorageBooking = localStorage.getItem('booking')
        // When user is signin during booking process or user login other situation
        if (localStorageBooking) {
            console.log('signIn: user when bookingCTX is present ', userCTX)
           //navigate('/booking-summary')
        } else {
            console.log('signIn: user when no bookingCTX ', userCTX)

           // navigate('/')
        }
        } else {
            // Redirect to login if no token
            console.log("No token")
          //  navigate('/signin')
        }
    }, [navigate])

    return <div>Logging you in...</div>
}

export default AuthSuccess
