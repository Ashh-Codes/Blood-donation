import React, { createContext, useState } from 'react'

export const showResponseContext=createContext()
const HandleShowContext = ({children}) => {
    const [showResponse,setshowResponse]=useState(false)
  return (
  <showResponseContext.Provider value={{showResponse,setshowResponse}}>
    {children}
  </showResponseContext.Provider>
  )
}

export default HandleShowContext
