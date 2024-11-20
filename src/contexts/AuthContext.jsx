import React, { createContext, useEffect, useState } from 'react'
export const tokenAuthContext=createContext()
const AuthContext = ({children}) => {
    const [isAuthorised,setisAuthorised] =useState(false)

    useEffect(()=>{
        if(sessionStorage.getItem("token")){
            setisAuthorised(true)
        }else{
            setisAuthorised(false)
        }

    },[isAuthorised])
  return (

    <tokenAuthContext.Provider value={{isAuthorised,setisAuthorised}}>
      {children}
    </tokenAuthContext.Provider>
  )
}

export default AuthContext
