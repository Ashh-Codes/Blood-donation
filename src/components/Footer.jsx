import React, { useState } from 'react'
import { FloatingLabel, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'





const Footer = () => {
  const [email,setemail] =useState("")
  const handleEmail=()=>{
    setemail("")
  }
  return (
    <div>
      <div style={{minHeight:'300px'}} className='container p-4  mt-5 w-100 shadow'>
        <div className="d-flex row justify-content-center">
           <div className="col-md-5">
            <h5>Introduction</h5>
            <p className='mt-4'>Drops  app is to make blood donations and conducting camps so that required blood can be easily made available and contact the donors easily without losing privacy</p>

           </div>
           <div className="col-md-2"> <h5>Links</h5>
           <div className='d-flex flex-column justify-content-center'>
          <Link className='text-decoration-none text-primary' to={'/'}> Home</Link>
          <Link className='text-decoration-none text-primary' to={'/camp'}> Camp</Link>
           <a className='text-decoration-none text-primary' href="">Register</a>
           <a className='text-decoration-none text-primary' href="">Dashboard</a>
           </div>
           </div>
           <div className="col-md-2"> <h5>Guids</h5>
           <div className='d-flex flex-column justify-content-center'>
           <a className='text-decoration-none text-primary' href="">React</a>
           <a className='text-decoration-none text-primary' href="">React Bootstrap</a>
           <a className='text-decoration-none text-primary' href="">Router</a>
           </div>
           </div>
           <div className="col-md-3"><h5>Contact Us</h5>
           <div className='d-flex row'>
           <div className='col-sm-8'>
           <FloatingLabel 
        controlId="floatingInput"
        label="Email address"
        className="mb-3"
        
      >
        <Form.Control value={email} onChange={e=>setemail(e.target.value)} style={{minWidth:'50px'}} type="email" placeholder="name@example.com" />
      </FloatingLabel>
           </div>
            <div className="col-sm-4">
            <a target='_blank' href="https://mail.google.com/"><button onClick={handleEmail} style={{height:'55px'}} className='btn btn-primary ms-2'><i class="fa-solid fa-arrow-right"></i></button></a>

            </div>
           </div>
           <div className='d-flex justify-content-evenly mt-3'>
           <i class="fa-brands fa-facebook text-primary"></i>
           <i class="fa-brands fa-instagram text-primary"></i>
           <i class="fa-brands fa-twitter text-primary"></i>
           <i class="fa-brands fa-linkedin text-primary"></i>
           <i class="fa-brands fa-github text-primary"></i>
           </div>
           </div>
           
        </div>

        <div className='text-center mt-5'>copyright @copy;  May 2024 @reg; Drops</div>
      
    </div>
    </div>
  )
}

export default Footer
