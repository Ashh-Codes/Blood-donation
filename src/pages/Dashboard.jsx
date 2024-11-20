import React, { useContext, useState } from 'react'
import Header from '../components/Header'
import View from '../components/View'
import Profile from '../components/Profile'




const Dashboard = () => {
 
  
  return (
    <div>
      <Header insideDashboard={true}/>

      <div style={{paddingTop:'100px'}} className="container-fluid ms-4">
      <div className="row mt-3">
        <div className="col-lg-7 ">
          <h1> Welcome,</h1>
          <div><View/></div>
        </div>
        <div className="col-lg-4">
          <Profile/>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Dashboard
