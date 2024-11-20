import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import CampCard from '../components/CampCard'
import Header from '../components/Header'
import { allCampAPI } from '../services/allAPI'
import { addCampResponseContext, editResponseContext } from '../contexts/contextShare'
import { hospitalResponseContext } from '../contexts/HospitalContext'


const Camp = () => {
  const{editResponse,seteditResponse}=useContext(editResponseContext)
  const {hospitalResponse,sethospitalResponse} =useContext(hospitalResponseContext)
  const {addCampResponse,setaddCampResponse}=useContext(addCampResponseContext)
  const [allCamps,setallCamps]=useState([])
  console.log(allCamps);
  useEffect(()=>{
    getallCamps()
  },[hospitalResponse,editResponse])
  
  const getallCamps=async()=>{
    const token=sessionStorage.getItem("token")
    if(token){
      const reqHeader={
        
        "Authorization":`Bearer ${token}`
      }
      try {
        const result=await allCampAPI(reqHeader)
        console.log(result);
        if(result.status==200){
          setallCamps(result.data)
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
       <Header/>
       <div style={{paddingTop:'120px'}}  className='ms-3 me-3'>
      <div className="container-fluid">
        
        <h1 className='text-primary text-center'>All Camps</h1>
      <Row className='mt-3'>
        {
          allCamps?.length>0 ?
          allCamps?.map(camp=>(
            <Col key={camp?._id} className='mb-3' sm={12} md={6} lg={4}>
        <CampCard displayData={camp}/>
        </Col>
          ))
          :
          <div className="text-center text-secondary fw-bolder m-5">
            Camps not found...
          </div>
        }
      </Row>
       


      </div>
      </div>
    </div>
  )
}

export default Camp
