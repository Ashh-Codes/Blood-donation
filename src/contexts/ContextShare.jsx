import React, { createContext, useState } from 'react'

export const addResponseContext = createContext()
export const addCampResponseContext=createContext()
export const editResponseContext=createContext()



const ConextShare = ({children}) => {
    const [addResponse,setAddResponse] = useState("")
    const [addCampResponse,setaddCampResponse]=useState("")
    const [editResponse,seteditResponse]=useState("")
    

  return (
    <addResponseContext.Provider value={{addResponse,setAddResponse}}> 
    <addCampResponseContext.Provider value={{addCampResponse,setaddCampResponse}}>
      <editResponseContext.Provider value={{editResponse,seteditResponse}}>
     {children}
     </editResponseContext.Provider>
     </addCampResponseContext.Provider>
    </addResponseContext.Provider>
  )
}

export default ConextShare