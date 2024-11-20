import React, { createContext, useState } from 'react'
export const authContext=createContext()


const RoleContext = ({children}) => {
    const [donarResponse,setdonarResponse]=useState("")
  return (
    <authContext.Provider value={{donarResponse,setdonarResponse}}>
      {children}
    </authContext.Provider>
  )
}

export default RoleContext
