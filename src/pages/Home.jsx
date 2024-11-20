import React, { useContext, useEffect, useState } from 'react'
import hands from '../assets/hands.png'
import heart from '../assets/heart.png'
import Carousel from 'react-bootstrap/Carousel';
import { Link, useNavigate } from 'react-router-dom';
import CampCard from '../components/CampCard';
import Header from '../components/Header';
import { allDonarsAPI, deleteDonarAPI, homeCampAPI } from '../services/allAPI';
import {  addResponseContext, editResponseContext } from '../contexts/contextShare';
import { authContext } from '../contexts/RoleContext';
import { hospitalResponseContext } from '../contexts/HospitalContext';
import { Spinner } from 'react-bootstrap';

const Home = () => {
  const [isloading,setisloading] =useState(false)
  const {addResponse,setAddResponse}=useContext(addResponseContext)
  const{editResponse,seteditResponse}=useContext(editResponseContext)
  const {donarResponse,setdonarResponse} =useContext(authContext)
  const {hospitalResponse,sethospitalResponse} =useContext(hospitalResponseContext)
  const navigate=useNavigate()
  
  const [searchKey,setsearchKey]=useState("")
  const [homeCamps,sethomeCamps] =useState([])
  const [allDonars,setallDonars] =useState([])
 
  useEffect(()=>{
    getALLHomeCamps()
    getAllDonars()

  },[addResponse,hospitalResponse,searchKey,editResponse])
  const [currentPage,setcurrentPage] =useState(1)
  const donarPerpage =5
  const totalPage = Math.ceil(allDonars?.length/donarPerpage)
  const currentPageLastDonarIndex = currentPage*donarPerpage
  const currentPageStartDonarIndex = currentPageLastDonarIndex - donarPerpage
  const visibleDonars = allDonars?.slice(currentPageStartDonarIndex,currentPageLastDonarIndex)


  
  const navigatenextpage =()=>{
    if(currentPage!=totalPage){
      setcurrentPage(currentPage+1)
    }
  }
  const navigateprevpage =()=>{
    if(currentPage!=1){
      setcurrentPage(currentPage-1)
    }
  }
  
  // console.log(homeCamps);
   console.log(allDonars);
 // console.log(donarResponse);
  
  const handleDonateBlood=()=>{
    setisloading(true)
                        
    setTimeout(() => {
      navigate('/dashboard')
     setisloading(false)
       }, 4000);
    
  }
  const handleCampOrganize=()=>{
    setisloading(true)
                        
    setTimeout(() => {
      navigate('/dashboard')
     setisloading(false)
       }, 4000);
    
  
  }
 
  const getAllDonars=async()=>{
    try{
      const donarResult = await allDonarsAPI(searchKey)
      console.log(donarResult);
      
      if(donarResult.status==200){
        setallDonars(donarResult.data)
      }
    }catch(err){
      console.log(err);
      
    }
  }
  const getALLHomeCamps=async()=>{
    try{
      const result = await homeCampAPI()
      if(result.status==200){
        sethomeCamps(result.data)
      }
    }catch(err){
      console.log(err);
      
    }
  }
  const handleCamps=()=>{
    if(sessionStorage.getItem("token")){
      navigate('/camp')
    }
    else{
      alert("Please login to see more...")
    }
    
  }
  const handleDeleteDonar=async(email,pid)=>{
    if(donarResponse==='donar'){
      const donarEmail=sessionStorage.getItem("user")
    console.log(JSON.parse(donarEmail).email);
    console.log(email);
    
    
   if(JSON.parse(donarEmail).email==email){
    const token = sessionStorage.getItem("token")
    if(token){
        const reqHeader={
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
        try {
          const result=await deleteDonarAPI(pid,reqHeader)
          if(result.status==200){
            getAllDonars()
          }
          else{
            console.log(result);
            
          }
        } catch (err) {
          console.log(err);
          
        }


      }
   }
   else{
    alert("Login Email doesn't match with donar Email...")
   }
    }
    else{
      alert("Only donars can delete the data")
    }
  }
  
  return (
    <>
    <Header/>
    <div style={{minHeight:'100vh',paddingTop:'50px'}} className="d-flex justify-content-center align-items-center rounded shadow w-100">
    <div  className='w-100'>
    <Carousel>
      <Carousel.Item interval={2000}>
      <img
          className="d-block w-100 img-fluid"
          src={hands}
          alt="First slide"
        />
        
        <div className='carousel-caption d-flex flex-column mb-5'> 
        
        <h1 class="text-sm-start w-50-lg text-primary">Donate Blood</h1>
                <h2 class="text-sm-start w-50-lg text-primary">Save Life</h2>
                <p class="text-sm-start text-dark fs-5">
                   
            Drops is India’s largest youth run initiative in the field
            of blood donation. We target to make India blood sufficient in the
            coming 10 years.
          
          
            </p>
            <div className="d-flex ">
              {/* <>
                    {sessionStorage.getItem("token") && sessionStorage.getItem("user") ? (
                      <Link className='text-start' to={'/dashboard'}>
                        <button className='btn btn-primary'>Donate Blood</button>
                      </Link>
                    ) : sessionStorage.getItem("tokenHospital") && sessionStorage.getItem("hospital") ? (
                      <Link className='text-start' to={'/:id/dashboard'}>
                        <button className='btn btn-white border text-primary ms-3'>Organize A Camp</button>
                      </Link>
                    ) : (
                      <Link className='text-start' to={'/login'}>
                        <button className='btn btn-white border text-primary ms-3'>See More...</button>
                      </Link>
                    )} 
              </> */}
              {donarResponse === 'donar' ? (
                <>
                <button onClick={handleDonateBlood} className='btn btn-primary'>Donate Blood</button>
                {isloading &&
                <Spinner animation="border" variant="dark" />

           }

                </> ) 
                :
                 donarResponse === 'hospital' ? 
                 ( <> <button onClick={handleCampOrganize} className='btn btn-primary '>Organize A Camp</button>
                  {isloading &&
                <Spinner animation="border" variant="dark" />

           }
                 </>  ) 
                 :
                  ( <Link className='text-start' to={'/login'}> <button className='btn btn-primary'>See More...</button> </Link> )}
           

            </div>
        </div>
      </Carousel.Item>
      <Carousel.Item interval={1000}>
      <img
          className="d-block w-100 img-fluid"
          src={heart}
          alt="First slide"
        />
      <div className='carousel-caption d-flex flex-column mb-5'> 
        <h1 class="text-sm-start w-50-lg text-primary">Days of gratitude</h1>
                <p class="text-sm-start text-dark fs-5">
                    Your birthday can be someone else's special day as well. Make your birthday memorable by giving someone the
                    “Gift of Life”. 
                <br/>
                Donate blood. Donate for a cause.
          
            </p>
            
        </div>
      </Carousel.Item>
     
    </Carousel>
    </div>
    
    </div>
    <div className="my-5 ">
      <h1 className='mb-5 text-primary text-center'>Available Donors</h1>
      <div className='d-flex justify-content-end'>
      <input onChange={e=>setsearchKey(e.target.value)}  placeholder='Search  by District...' type="text" className='form-control w-25 me-2'/>

      </div>
      <table className='my-5  shadow table'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Blood Group</th>
            <th>District</th>
            <th>Email</th>
            <th>...</th>
           
          </tr>
        </thead>
        <tbody >
          {
            allDonars?.length >0?
            visibleDonars?.map((donar,index)=>(
              <tr style={{backgroundColor:"green"}} key={donar?._id}>
              <td>{index+1}</td>
            <td>{donar?.donarName}</td>
            <td>{donar?.bloodGroup}</td>
            <td>{donar?.district}</td>
            <td>{donar?.email}</td>
            <td><button onClick={()=>handleDeleteDonar(donar?.email,donar?._id)}  className="btn"><i class="fa-solid fa-trash text-primary"></i></button></td>
            </tr>
            ))
            :
            <div className="text-center fw-bolder text-secondary m-3">
              No donars available at the moment!!!
            </div>
          }
        
        </tbody>
      </table>
      <div  className="d-flex justify-content-center  mt-5 mb-5 w-100">
    <span  onClick={navigateprevpage} style={{cursor:'pointer'}}><i className='fa-solid fa-backward me-5'></i></span>
    <span className='font-bold'>{`${currentPage} of ${totalPage}`}</span>
    <span onClick={navigatenextpage} style={{cursor:'pointer'}}><i className='fa-solid fa-forward ms-5'></i></span>
    </div>
         
    </div>
    <div className="my-5 text-center">
      <h1 className='mb-5 text-primary'>Camps organised by hospitals</h1>
      <marquee>
        <div className="d-flex">
          {
          homeCamps?.length>0&&
          homeCamps?.map(camp=>(
            <div className="me-4" key={camp?._id}>
            <CampCard displayData={camp}/>
          </div>
          ))
          }
        </div>
      </marquee>
      <button onClick={handleCamps} className='btn btn-link mt-5'>Click here to view more Camps...</button>
      
    </div>
    
    </>
  )
}

export default Home
