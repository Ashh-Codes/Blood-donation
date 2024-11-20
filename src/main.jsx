import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'
import ConextShare from './contexts/contextShare.jsx'
import RoleContext from './contexts/RoleContext.jsx'
import HospitalContext from './contexts/HospitalContext.jsx'
import AuthContext from './contexts/AuthContext.jsx'
import BookingContext from './contexts/BookingContext.jsx'
import HandleShowContext from './contexts/HandleShowContext.jsx'





createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContext>
    <HandleShowContext>
    <BookingContext>
    <RoleContext>
    <ConextShare>
    <HospitalContext>
    <BrowserRouter>
    <App />
    </BrowserRouter> 
    </HospitalContext>
    </ConextShare>
    </RoleContext>
    </BookingContext>
    </HandleShowContext>
    </AuthContext>
  </StrictMode>,
)
