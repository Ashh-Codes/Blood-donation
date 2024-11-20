import React, { createContext, useState } from 'react'
export const slotBookingContext= createContext()
const BookingContext = ({children}) => {
    const [bookingResponse,setbookingResonse] =useState("")
  return (
    <slotBookingContext.Provider value={{bookingResponse,setbookingResonse}}>
      {children}
    </slotBookingContext.Provider>
  )
}

export default BookingContext
