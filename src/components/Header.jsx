import React, { useContext } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import drops from '../assets/drops.png'
import { useNavigate } from 'react-router-dom'
import { tokenAuthContext } from '../contexts/AuthContext'


const Header = ({insideDashboard}) => {
  const {isAuthorised,setisAuthorised} =useContext(tokenAuthContext)
  const navigate=useNavigate()
  const handleLogout=()=>{
    sessionStorage.clear()
    setisAuthorised(false)
    navigate('/')
  }
  return (
    <div>
        <Navbar className='bg-primary w-100 position-fixed' style={{height:'100px',zIndex:1}}>
        <Container>
          <Navbar.Brand href="#home" className='text-white mt-2 fs-2 headline'>
            
            Drops
            <img
              alt=""
              src={drops}
              width="80px"
              height="80px"
              className="d-inline-block mb-3"
            />{' '}
          </Navbar.Brand>
          {
            insideDashboard&&
            <div className="ms-auto">
                <button onClick={handleLogout} className='btn btn-link text-white fw-bolder'>Logout <i className='fa-solid fa-right-from-bracket'></i></button>
            </div>
          }
        </Container>
      </Navbar>
    </div>
  )
}

export default Header
