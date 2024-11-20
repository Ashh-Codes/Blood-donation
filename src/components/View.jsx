import React, { useContext, useEffect, useState } from 'react'
import Add from './Add'


import AddCamp from './AddCamp'
import { authContext } from '../contexts/RoleContext'
import { getAllBookingsAPI, getAllHospitalCampsAPI } from '../services/allAPI'
import { addCampResponseContext } from '../contexts/contextShare'
import { slotBookingContext } from '../contexts/BookingContext'



const View = () => {
  
  const {donarResponse,setdonarResponse} =useContext(authContext)
  const {addCampResponse,setaddCampResponse}=useContext(addCampResponseContext)
  const {bookingResponse,setbookingResonse} =useContext(slotBookingContext)
  const [userEmail,setuserEmail] =useState("")
  const [hospitalEmail,sethospitalEmail] =useState("")
  const [allcamps,setallcamps] =useState([])
  const [allBookings,setallBookings] =useState([])
  
  
  
  
  console.log(allcamps);
console.log(allBookings);
useEffect(()=>{
  if(donarResponse==='donar'){
    const useremail=JSON.parse(sessionStorage.getItem("user"))
    setuserEmail(useremail?.email)
    getallBookings()
  
  }
  else{
    const useremail=JSON.parse(sessionStorage.getItem("hospital"))
    sethospitalEmail(useremail?.email)
   getallCamps()
  }
},[userEmail,hospitalEmail,bookingResponse])

useEffect(()=>{

    getallCamps()
  
},[addCampResponse])

  const getallCamps=async()=>{
    const token=sessionStorage.getItem("token")
   
    
    // console.log(JSON.parse(useremail).email);
    
  
    if(token &&hospitalEmail){
      const reqHeader={
        
        "Authorization":`Bearer ${token}`
      }
      try {
        const result=await getAllHospitalCampsAPI(hospitalEmail,reqHeader)
        console.log(result);
        if(result.status==200){
          setallcamps(result.data)
        }
        else{
          console.log(result.response.data);
          
        }
        
      } catch (err) {
        console.log(err);
        
      }
    }
  }
  console.log(userEmail);
  const getallBookings=async()=>{
    const token=sessionStorage.getItem("token")
   
   
    // console.log(JSON.parse(useremail).email);
    
    if(token&&userEmail){
      const reqHeader={
        
        "Authorization":`Bearer ${token}`
      }
      try {
        const result=await getAllBookingsAPI(userEmail,reqHeader)
        console.log(result);
        if(result.status==200){
          setallBookings(result.data)
        }
        else{
          console.log(result.response.data);
          
        }
        
      } catch (err) {
        console.log(err);
        
      }
    }
  }
  return (
    <div>
 {
 donarResponse === 'donar' && sessionStorage.getItem("token") ?
  ( <>
  <div className="d-flex justify-content-between mt-4 mb-4"> <h3>Add Donor Details:</h3> <div><Add /></div> </div> 
    <h2 className='text-primary'>Upcoming Donation Camps</h2>
    <div>
    {
      allBookings.length>0?
      allBookings?.map(camp=>(
        <div key={camp?._id} className="w-100 d-flex justify-content-between items-center border shadow my-3 p-3">
        <h3>{camp?.venue}</h3>
        <p className='mt-2'>{camp?.date}</p>
      </div>
      ))
      :
      <div className="text-secondary fw-bolder p-2">
        No upcomings events...
      </div>
     }
    </div>
  </>
  ) :
   (<>
    <div className="d-flex justify-content-between mt-4 mb-4"> <h3>Add Camp Details:</h3> <div><AddCamp /></div> </div>
    <h2 className='text-primary'>Upcoming Donation Camps</h2>
    <div>
     {
      allcamps.length>0?
      allcamps?.map(camp=>(
        <div key={camp?._id} className="w-100 d-flex justify-content-between items-center border shadow my-3 p-3">
        <h3>{camp?.venue}</h3>
        <p className='mt-2'>{camp?.date}</p>
      </div>
      ))
      :
      <div className="text-secondary fw-bolder p-2">
        No upcomings events...
      </div>
     }
    </div>
   </>
    )
  }
   
   

    
    </div>
   
  )
}

export default View
