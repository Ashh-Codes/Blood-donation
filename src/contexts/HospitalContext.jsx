import React, { createContext, useEffect, useState } from 'react'
export const hospitalResponseContext=createContext()

const HospitalContext = ({children}) => {
    const [hospitalResponse,sethospitalResponse]=useState("")
  return (
   
    <hospitalResponseContext.Provider value={{hospitalResponse,sethospitalResponse}}>
      {children}
    </hospitalResponseContext.Provider>
  )
}

export default HospitalContext
