import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Modal,Spinner} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import SERVERURL from '../services/serverURL';
import { authContext } from '../contexts/RoleContext';
import { hospitalResponseContext } from '../contexts/HospitalContext';
import { addBokkingAPI, deleteCampAPI } from '../services/allAPI';
import Edit from './Edit';
import { slotBookingContext } from '../contexts/BookingContext';
import { showResponseContext } from '../contexts/HandleShowContext';





const CampCard = ({displayData}) => {
  const [isloading,setisloading] =useState(false)

  const {showResponse,setshowResponse}=useContext(showResponseContext)
  const {hospitalResponse,sethospitalResponse} =useContext(hospitalResponseContext)
  const {bookingResponse,setbookingResonse} =useContext(slotBookingContext)

  const {donarResponse,setdonarResponse} =useContext(authContext)
  const navigate=useNavigate()

  const [bookingData,setbookingData]=useState({
    hospitalName:displayData?.hospitalName,
    email:displayData?.email,
    contact:displayData?.contact,
    venue:displayData?.venue,
    date:displayData?.date,
    useremail:""


  })
  
   useEffect(()=>{
  if(donarResponse==='donar'){
    const userEmail=JSON.parse(sessionStorage.getItem("user"))
    
  setbookingData({...bookingData,useremail:userEmail?.email})
  }
   },[])
   useEffect(() => { 
    if (showResponse) 
      { 
        handleClose();

       } 
  }, [showResponse]);

   console.log(bookingData);
   
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleCampsCard=()=>{
    if(sessionStorage.getItem("token")){
      handleShow(true)
    }
    else{
      alert("Please login to see more...")
    }
    
  }
  console.log(hospitalResponse);
  
  const handleCampDelete=async(cid,email)=>{
    console.log(cid,email);
    const hospitalEmail=sessionStorage.getItem("hospital")
    
    if(JSON.parse(hospitalEmail).email==email){
      const token = sessionStorage.getItem("token")
    if(token){
        const reqHeader={
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
        try {
          const result=await deleteCampAPI(cid,reqHeader)
          if(result.status==200){
            alert("Camp deleted successfully")
            sethospitalResponse(result)
            handleClose(true)
          }
          else{
            console.log(result);
            
          }
        } catch (err) {
          console.log(err);
          
        }


      }


    }else{
      alert("Emails doesn't match...only registered Hospitals can delete camps")
    }
  }

  const handleBooking=async()=>{
  
      const {hospitalName,email,contact,venue,date,useremail} = bookingData
     
        const token=sessionStorage.getItem("token")
        if(token){
          const reqHeader={
            
            "Authorization":`Bearer ${token}`
          }
          try {
            const result =await addBokkingAPI(bookingData,reqHeader)
            console.log(result);
            if(result.status==200){
              setisloading(true)
              setTimeout(() => {
                handleClose()
             // alert("Donar added successfully")
             alert(`Booking Details:
              Hospital Name:${displayData?.hospitalName}
              Venue:${displayData?.venue}
              Date:${displayData?.date}`)
              setbookingResonse(result)
              setisloading(false)
              navigate('/dashboard')
              }, 2000);
              
              
             //share result through context
             
            
            }else{
              alert(result.response.data)
            }
            
          } catch (err) {
            console.log(err);
            
          }
        
      }
      else{
        alert("Fill the form completely...")
      }
    
      

    }
  return (
   <>
   <Card className='shadow btn '>
      <Card.Img height={'200px'} style={{width:'400px'}} variant="top" src={`${SERVERURL}/uploads/${displayData?.venuePic}`} />
      <Card.Body>
        <Card.Title>{displayData?.hospitalName}</Card.Title>
        <Button onClick={handleCampsCard}  variant="primary" >
            More Details
          </Button>
       
      </Card.Body>
    </Card>

    <Modal size='lg' centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Camp Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="row">
                <div className="col-lg-6">
                    <img  className="img-fluid rounded" src={`${SERVERURL}/uploads/${displayData?.venuePic}`} alt="" />
                </div>
                <div className="col-lg-6">
                    <h3>{displayData?.hospitalName}</h3>
                    
                    
                    <h6><span className='fw-bolder'>Hospital Email :</span>{displayData?.email}</h6>
                    <h6><span className='fw-bolder'>Contact :</span>{displayData?.contact}</h6>
                    <h6><span className='fw-bolder'>Venue:</span>{displayData?.venue}</h6>
                    <h6><span className='fw-bolder'>Date:</span>{displayData?.date}</h6>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        
          {donarResponse === 'hospital' ? ( <> <div><Edit displayData={displayData}/></div> <button onClick={() => handleCampDelete(displayData?._id, displayData?.email)} className="btn"> <i className="fa-solid fa-trash text-primary"></i> </button> </> ) : (<> <Button onClick={handleBooking} variant="success">Book A Slot</Button>
            {isloading &&
                <Spinner animation="border" variant="dark" />

           }

            </>
         )}
{/*           

          {donarResponse === 'hospital' ?
          <>
           ( 
            <button onClick={()=>handleEditCamponClick(displayData?._id,displayData?.email)} className='btn '><i className='fa-solid fa-edit'></i></button>
           <button onClick={()=>handleCampDelete(displayData?._id,displayData?.email)}  className="btn"> <i className="fa-solid fa-trash text-primary"></i> </button> 
           ) : 
           ( <Link to={'/booking'}> <Button variant="success"> Book A Slot </Button> </Link> )
           </>
           } */}
         
        </Modal.Footer>
      </Modal>
   
   
   </>
  )
}

export default CampCard
