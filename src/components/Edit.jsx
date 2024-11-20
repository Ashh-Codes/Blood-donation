import React, { useContext, useEffect, useState } from 'react'
import upload from '../assets/upload.png'
import { Button, FormControl, Modal,Form, Spinner } from 'react-bootstrap';
import SERVERURL from '../services/serverURL';
import { editResponseContext } from '../contexts/contextShare';
import { editCampAPI } from '../services/allAPI';
import { showResponseContext } from '../contexts/HandleShowContext';


const Edit = ({displayData}) => {
    const [isloading,setisloading] =useState(false)
    const {showResponse,setshowResponse}=useContext(showResponseContext)
    const {editResponse,seteditResponse}=useContext(editResponseContext)
    const [preview, setpreview] = useState(upload)
    const [imagefileStatus, setimagefileStatus] = useState(false)
    const [campDetails, setCampDetails] = useState({
        id:displayData?._id,
        hospitalName:displayData?.hospitalName,
        email:displayData?.email,
        venue:displayData?.venue,
        date: displayData?.date,
        contact:displayData?.contact,
        venuePic: ""
    })
    useEffect(()=>{
        if(campDetails.venuePic.type=="image/png"|| campDetails.venuePic.type=="image/jpg"|| campDetails.venuePic.type=="image/jpeg"){
            setimagefileStatus(true)
            setpreview(URL.createObjectURL(campDetails.venuePic))
          }
          else{
            setimagefileStatus(false)
            setpreview("")
            setCampDetails({...campDetails,venuePic:""})
          }
          
          
    },[campDetails.venuePic])
    const [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(true);
        
        setCampDetails({
            id:displayData?._id,
        hospitalName:displayData?.hospitalName,
        email:displayData?.email,
        venue:displayData?.venue,
        date: displayData?.date,
        contact:displayData?.contact,
        venuePic: ""
        })


    }
    const handleClose = () => {
        setShow(false);
        setCampDetails({
            id:displayData?._id,
        hospitalName:displayData?.hospitalName,
        email:displayData?.email,
        venue:displayData?.venue,
        date: displayData?.date,
        contact:displayData?.contact,
        venuePic: ""
        })
    }
    const handleEditCamp=async(email)=>{
        const hospitalEmail=sessionStorage.getItem("hospital")
        
        if(JSON.parse(hospitalEmail).email==email){
            const {id,hospitalName,email,venue,date,contact,venuePic}=campDetails
          
        if(venue&&date&&contact){
            const reqBody=new FormData()
            reqBody.append("hospitalName",hospitalName)
            reqBody.append("email",email)
            reqBody.append("venue",venue)
            reqBody.append("date",date)
            reqBody.append("contact",contact)
            preview? reqBody.append("venuePic",venuePic):reqBody.append("venuePic",displayData?.venuePic)

            const token = sessionStorage.getItem("token")
            if(token){
                const reqHeader={
                    "Content-Type":preview?"multipart/form-data":"application/json",
                    "Authorization":`Bearer ${token}`
                }
                try {
                    const result=await editCampAPI(id,reqBody,reqHeader)
                    if(result.status==200){
                        setisloading(true)
                        setTimeout(() => {
                            alert("Camp updated successfully")
                            handleClose()
                            setshowResponse(true)
                            seteditResponse(result)
                            setisloading(false)
                            
                          
                          }, 2000);
                       
                    }else{
                        console.log(result);
                        
                    }
                } catch (err) {
                    console.log(err);
                    
                }
                
              }
        }
        else{
            alert("Please fill the form completely...")
        }
      }
      else{
        alert("Login Email doesn't match with camp data...")
      }
    }
  return (
    <div>
       <button onClick={handleShow} className='btn btn-secondary'><i className='fa-solid fa-edit'></i>Camp Details</button>
       <Modal size='lg' centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Camp Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="row align-items-center">
                        <div className="col-lg-5 align-items-center">
                            <label >
                                <input onChange={e => setCampDetails({ ...campDetails, venuePic: e.target.files[0] })} style={{ display: 'none' }} type="file" />
                                <img height={'200px'} className='ms-4 rounded' src={preview?preview:`${SERVERURL}/uploads/${displayData?.venuePic}`} alt="" />
                            </label>

                            {!imagefileStatus &&
                                <div className="text-warning fw-bolder my-2 ms-4">Upload only the following types(jpg,png,jpeg) here!!!</div>
                            }

                        </div>
                        <div className="col-lg-7 mt-2">
                        <div className="mb-2"> 
                        <Form.Group className="mb-3">
                            
                            <Form.Control placeholder={displayData?.hospitalName} disabled />
                        </Form.Group>
                            </div>
                            <div className="mb-2">
                            <Form.Group className="mb-3">
                            
                            <Form.Control placeholder={displayData?.email} disabled />
                        </Form.Group>

                            </div>
                            <div className="mb-2">
                                <input value={campDetails?.venue} onChange={e => setCampDetails({ ...campDetails, venue: e.target.value })} type="text" placeholder='Venue' className='form-control' />
                            </div>
                            <div className="mb-2">
                                <input value={campDetails?.date} onChange={e => setCampDetails({ ...campDetails, date: e.target.value })} type="date" placeholder='Date' className='form-control' />
                            </div>

                            <div className="mb-2">
                                <input value={campDetails?.contact} onChange={e => setCampDetails({ ...campDetails, contact: e.target.value })} type="text" placeholder='Contact' className='form-control' />
                            </div>

                        </div>
                    </div>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={()=>handleEditCamp(displayData?.email)}>
                        Update
                    </Button>
                    {isloading &&
                <Spinner animation="border" variant="dark" />

           }
                </Modal.Footer>
            </Modal>
    </div>
  )
}

export default Edit
