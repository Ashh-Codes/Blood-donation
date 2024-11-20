import { useContext, useState } from 'react'

import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Help from './pages/Help'

import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Camp from './pages/Camp'
import Footer from './components/Footer'
import { tokenAuthContext } from './contexts/AuthContext'


function App() {
  const {isAuthorised,setisAuthorised}=useContext(tokenAuthContext)
  return (
    <>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Auth/>}/>
     
      <Route path='/register' element={<Auth insideRegister={true}/>}/>
      
      <Route path='/dashboard' element={isAuthorised?<Dashboard />:<Navigate to={'/login'}/>}/>
      <Route path='/camp' element={isAuthorised?<Camp/>:<Navigate to={'/login'}/>}/>
      
      <Route path='/help' element={<Help/>}/>
     </Routes>
     <Footer/>
    </>
  )
}

export default App
