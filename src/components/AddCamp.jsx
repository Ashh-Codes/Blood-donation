import React, { useContext, useEffect, useState } from 'react'
import { Button, Dropdown, Form, FormControl, Modal, Spinner } from 'react-bootstrap';
import upload from '../assets/upload.png'
import { addCampAPI, getAllHospitalAPI } from '../services/allAPI';
import { addCampResponseContext } from '../contexts/contextShare';
import { hospitalResponseContext } from '../contexts/HospitalContext';



const AddCamp = () => {
    const [isloading,setisloading] =useState(false)
    const {addCampResponse,setaddCampResponse}=useContext(addCampResponseContext)
    const [preview, setpreview] = useState(upload)
    const [imagefileStatus, setimagefileStatus] = useState(false)
    const [hospitalData,setHospitalData]=useState([])
    const [campDetails, setCampDetails] = useState({
        hospitalName: "",
        email:"",
        venue: "",
        date: "",
        contact:"",
        venuePic: ""
    })
    console.log(campDetails);
    useEffect(()=>{
        const hospitalDataFun=async()=>{
            console.log("Inside hospital fun");
            
            const token = sessionStorage.getItem("token")
            if(token){
                const reqHeader={
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
                try {
                    const result=await getAllHospitalAPI(reqHeader)
                    if(result.status==200){
                        setisloading(true)
                        console.log(result);
                        setTimeout(() => {
                            setHospitalData(result.data)
                          setisloading(false)
                          }, 2000);
                       
                    }
                } catch (err) {
                    console.log(err);
                    
                }

            }
        }
            hospitalDataFun();
    },[])
    useEffect(()=>{
        if(campDetails.venuePic.type=="image/png"|| campDetails.venuePic.type=="image/jpg"|| campDetails.venuePic.type=="image/jpeg"){
            setimagefileStatus(true)
            setpreview(URL.createObjectURL(campDetails.venuePic))
          }
          else{
            setimagefileStatus(false)
            setpreview(upload)
            setCampDetails({...campDetails,venuePic:""})
          }
          
          
    },[campDetails.venuePic])
   // console.log(hospitalData);
    

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setCampDetails({
            hospitalName: "",
        email:"",
        venue: "",
        date: "",
        contact:"",
        venuePic: ""
        })

    }
    const handleShow = () => setShow(true);

    const saveCampDetails=async()=>{
        console.log("Camp method")
        const {hospitalName,email,venue,date,contact,venuePic} =campDetails
        console.log(hospitalName,email,venue,date,contact,venuePic)
        if(hospitalName&&venue&&date&&contact&&venuePic&&email){
            const reqBody=new FormData()
            reqBody.append("hospitalName",hospitalName)
            reqBody.append("email",email)
            reqBody.append("venue",venue)
            reqBody.append("date",date)
            reqBody.append("contact",contact)
            reqBody.append("venuePic",venuePic)
            
            

            
            const token = sessionStorage.getItem("token")
            if(token){
                const reqHeader={
                    "Content-Type":"multipart/form-data",
                    "Authorization":`Bearer ${token}`
                }
                try{
                    console.log(reqBody);
                    console.log(reqHeader);
                    
                    const result=await addCampAPI(reqBody,reqHeader)
                    console.log("ADD CAMP API")
                    console.log(result);
                    
                    if(result.status==200){
                        setisloading(true)
                        
                        setTimeout(() => {
                            handleClose()
                        setaddCampResponse(result)
                          setisloading(false)
                          }, 2000);
                       
                        
                    }else{
                        alert(result.response.data)
                    }
                }catch(err){
                    console.log(err)
                }

            }

        }else{
            alert("Please fill the form completely")
        }
    }
    return (
        <div>
            <button onClick={handleShow} className='btn btn-primary'><i className='fa-solid fa-plus'></i>Camp Details</button>
            <Modal size='lg' centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Camp Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row align-items-center">
                        <div className="col-lg-5 align-items-center">
                            <label >
                                <input onChange={e => setCampDetails({ ...campDetails, venuePic: e.target.files[0] })} style={{ display: 'none' }} type="file" />
                                <img height={'200px'} className='ms-4 rounded' src={preview} alt="" />
                            </label>

                            {!imagefileStatus &&
                                <div className="text-warning fw-bolder my-2 ms-4">Upload only the following types(jpg,png,jpeg) here!!!</div>
                            }

                        </div>
                        <div className="col-lg-7 mt-2">
                        <div className="mb-2"> <label htmlFor="dropdown">Hospitals:</label> <select id="dropdown" value={campDetails.hospitalName} onChange={(e) => setCampDetails({ ...campDetails, hospitalName: e.target.value }) } > <option value="">--Select--</option> {hospitalData.map((item) => ( <option key={item?._id} value={item?.hospitalname}> {item?.hospitalname} </option> ))} </select> </div>
                            <div className="mb-2">
                                <input onChange={e => setCampDetails({ ...campDetails, email: e.target.value })} type="email" placeholder='Hospital Email' className='form-control' />

                            </div>
                            <div className="mb-2">
                                <input onChange={e => setCampDetails({ ...campDetails, venue: e.target.value })} type="text" placeholder='Venue' className='form-control' />
                            </div>
                            <div className="mb-2">
                                <input onChange={e => setCampDetails({ ...campDetails, date: e.target.value })} type="date" placeholder='Date' className='form-control' />
                            </div>

                            <div className="mb-2">
                                <input onChange={e => setCampDetails({ ...campDetails, contact: e.target.value })} type="text" placeholder='Contact' className='form-control' />
                            </div>

                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={saveCampDetails}>
                        Add
                    </Button>
                    {isloading &&
                <Spinner animation="border" variant="dark" />
             }
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddCamp
