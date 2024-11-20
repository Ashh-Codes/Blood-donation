import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal, Spinner } from 'react-bootstrap';
import { addDonarAPI } from '../services/allAPI';
import { addResponseContext } from '../contexts/contextShare';



const Add = () => {
  const [isloading,setisloading] =useState(false)
  const {addResponse,setAddResponse}=useContext(addResponseContext)
  const [donarDetails,setdonarDetails] =useState({
    donarName:"",
    email:"",
    bloodGroup:"",
    district:""
  })
  
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    console.log(donarDetails);

    const handleAddDonar=async()=>{
      const {donarName,email,bloodGroup,district} = donarDetails
      if(donarName&&email&&bloodGroup&&district){
        const token=sessionStorage.getItem("token")
        if(token){
          const reqHeader={
            
            "Authorization":`Bearer ${token}`
          }
          try {
            const result =await addDonarAPI(donarDetails,reqHeader)
            console.log(result);
            if(result.status==200){
              setisloading(true)
          setTimeout(() => {
            handleClose()
            setAddResponse(result)
          setisloading(false)
          }, 2000);
            
            
            }else{
              alert(result.response.data)
            }
            
          } catch (err) {
            console.log(err);
            
          }
        }
      }
      else{
        alert("Fill the form completely...")
      }
    }
    
  return (
    <div>

      <button onClick={handleShow} className='btn btn-primary'><i className='fa-solid fa-plus'></i>Donor Details</button>
      <Modal size='lg' centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Donor Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row align-items-center">
                
                <div >
                    <div className="mb-2">
                        <input onChange={e=>setdonarDetails({...donarDetails,donarName:e.target.value})}  type="text" placeholder='Name' className='form-control'/>
                    </div>
                    <div className="mb-2">
                        <input onChange={e=>setdonarDetails({...donarDetails,email:e.target.value})} type="email" placeholder='Email' className='form-control'/>
                    </div>
                    <div className="mb-2">
                        <input onChange={e=>setdonarDetails({...donarDetails,bloodGroup:e.target.value})} type="text" placeholder='Blood Group' className='form-control'/>
                    </div>
                    <div className="mb-2">
                        <input onChange={e=>setdonarDetails({...donarDetails,district:e.target.value})} type="text" placeholder='District' className='form-control'/>
                    </div>
                    
                </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button  variant="primary" onClick={handleAddDonar}>

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

export default Add
