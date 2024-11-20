import React, { useState } from 'react'
import Header from '../components/Header'
import { Button, Modal } from 'react-bootstrap'



const Booking = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Header />
      <div style={{width:'100%',minHeight:'100vh',paddingTop:'10px'}} className='d-flex justify-content-center align-items-center'>
      <div className="container">
      <div className="card  shadow p-5">
      <h2 className='text-primary text-center'>Hospital Name</h2>
      <h4 className='text-dark text-center'>Date</h4>
      <h4 className='text-dark text-center'>Venue</h4>
      <div className="row mt-4">
        <div className="col-lg-3">
        <button onClick={handleShow} className='bg-success p-2 rounded shadow'>10:00am-11:00am</button>
        </div>
        <div className="col-lg-3">
        <button onClick={handleShow} className='bg-success p-2 rounded shadow'>11:00am-12:00pm</button>

        </div>
        <div className="col-lg-3">
        <button onClick={handleShow} className='bg-success p-2 rounded shadow'>02:00pm-03:00pm</button>
        </div>
        <div className="col-lg-3">
        <button onClick={handleShow} className='bg-success p-2 rounded shadow'>03:00pm-04:00pm</button>
        </div>
      </div>
      </div>
      </div>
      </div>
      <Modal size='lg' centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Slots</Modal.Title>
        </Modal.Header>
        <Modal.Body className='m-4'>
            <button className='btn btn-white border me-3 ms-5'>1</button>
            <button className='btn btn-white border me-3'>2</button>
            <button className='btn btn-white border me-3'>3</button>
            <button className='btn btn-white border me-3'>4</button>
            <button className='btn btn-white border me-3'>5</button>
            <button className='btn btn-white border me-3'>6</button>
            <button className='btn btn-white border me-3'>7</button>
            <button className='btn btn-white border me-3'>8</button>
            <button className='btn btn-white border me-3'>9</button>
            <button className='btn btn-white border me-3'>10</button>
            
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    
    
  )
}

export default Booking
