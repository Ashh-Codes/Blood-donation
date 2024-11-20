import React, { useContext, useState } from 'react'
import drops from '../assets/drops.png'
import { FloatingLabel, Form, Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { loginHospitalAPI, loginUserAPI, registerHospitalAPI, registerUserAPI } from '../services/allAPI'
import { authContext } from '../contexts/RoleContext'
import { tokenAuthContext } from '../contexts/AuthContext'







const Auth = ({ insideRegister }) => {
  const [isloading,setisloading] =useState(false)
  const {isAuthorised,setisAuthorised} =useContext(tokenAuthContext)
  const {donarResponse,setdonarResponse} =useContext(authContext)
  const [role, setrole] = useState("donar")
  const navigate = useNavigate()
  const [userData, setUserData] = useState({

    username: "",
    email: "",
    password: ""
  })
  const [hospitalData, sethospitalData] = useState({

    email: "",
    password: "",
    hospitalname: "",
    registerNumber: "",
    contact: "",
  })
  console.log(hospitalData);
  //console.log(`This is user data ${userData}`);


  const handleRegister = async (e) => {
    e.preventDefault()
    if (role == "hospital") {
      if (hospitalData.hospitalname && hospitalData.email && hospitalData.password && hospitalData.registerNumber && hospitalData.contact) {
        //api call
        try {
          const result = await registerHospitalAPI(hospitalData)
          if (result.status == 200) {
            alert("Welcome user...please login to explore website")
            sethospitalData({
              email: "",
              password: "",
              hospitalname: "",
              registerNumber: "",
              contact: ""
            })
           
            navigate('/login')

          }
          else {
            if (result.response.status == 406) {
              alert(result.response.data)
              sethospitalData({
                email: "",
                password: "",
                hospitalname: "",
                registerNumber: "",
                contact: ""
              })

            }
          }
        } catch (err) {
          console.log(err);

        }
        //alert("proceed to hospital api call")
      } else {
        alert("Fill form completely")
      }
    } else {
      // console.log("inside else part ");

      if (userData.email && userData.password && userData.username) {


        try {
          const result = await registerUserAPI(userData)
          if (result.status == 200) {
            alert("Welcome user...please login to explore website")
            setUserData({
              username: "",
              email: "",
              password: ""
            })
            navigate('/login')

          }
          else {
            if (result.response.status == 406) {
              alert(result.response.data)
              setUserData({
                username: "",
                email: "",
                password: ""
              })

            }
          }
        } catch (err) {
          console.log(err);

        }

      }
      else {
        alert("Fill form completelty")
      }
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    if (role === 'donar') {
      if (userData.email && userData.password) {
        try {
          const result = await loginUserAPI(userData)
          if (result.status == 200) {
            sessionStorage.setItem("user", JSON.stringify(result.data.user))
            sessionStorage.setItem("token", result.data.token)
            setisAuthorised(true)
            setisloading(true)
          setTimeout(() => {
            setUserData({
              username: "",
              email: "",
              password: ""
            })
            setdonarResponse(role)
          navigate('/')
          setisloading(false)
          }, 2000);
            

          }
          else {
            if (result.response.status == 404) {
              alert(result.response.data)
            }
          }

        } catch (err) {
          console.log(err);
        }
      }
      else {
        alert("Please fill details")
      }
    }
    else {
      if (hospitalData.email && hospitalData.password) {
        try {
          const result = await loginHospitalAPI(hospitalData)
          if (result.status == 200) {
            sessionStorage.setItem("hospital", JSON.stringify(result.data.hospital))
            sessionStorage.setItem("token", result.data.token)
            setisAuthorised(true)
            setisloading(true)
          setTimeout(() => {
            sethospitalData({
              email: "",
              password: "",
              hospitalname: "",
              registerNumber: "",
              contact: ""
            })
            setdonarResponse(role)
          navigate('/')
          setisloading(false)
          }, 2000);
          }
          else {
            if (result.response.status == 404) {
              alert(result.response.data)
            }
          }


        } catch (err) {
          console.log(err);

        }
      }
      else {
        alert("Please fill details")
      }
    }
  }






  return (
    <div style={{ width: '100%', minHeight: '100vh' }} className='d-flex justify-content-center align-items-center bloodImage'>
      <div className="container bgtrans mt-4 mb-4" style={{ width: '500px', minHeight: '100vh' }}>
        <div className="card  shadow p-5">

          <div className="d-flex justify-content-center">

            <h1 className="fw-bolder mt-3 text-center text-primary">Drops</h1>
            <img width={'80px'} height={'80px'} src={drops} alt="" />
          </div>
          <h5 className='text-center mb-3'>Sign {insideRegister ? "Up" : "In"} to your account</h5>
          <div className="d-flex justify-content-center mb-3">
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                name="role"
                id="donarRadio"
                value={"donar"}
                onChange={(e) => setrole(e.target.value)}
                defaultChecked
              />
              <label htmlFor="adminRadio" className="form-check-label">
                Donar
              </label>
            </div>
            <div className="form-check ms-2">
              <input
                type="radio"
                className="form-check-input"
                name="role"
                id="hospitalRadio"
                value={"hospital"}
                onChange={(e) => setrole(e.target.value)}
              />
              <label htmlFor="hospitalRadio" className="form-check-label">
                Hospital
              </label>
            </div>
          </div>

          {
            insideRegister && role === "donar" && (

              <Form.Group className="mb-3" controlId="exampleForm.ControlInput7">
                <Form.Label>Username</Form.Label>
                <Form.Control onChange={e => setUserData({ ...userData, username: e.target.value })} type="text" placeholder="username" />
              </Form.Group>
            )
          }
          {
            insideRegister && role === "hospital" && (
              <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                  <Form.Label>Hospital Name</Form.Label>
                  <Form.Control onChange={e => sethospitalData({ ...hospitalData, hospitalname: e.target.value })} type="text" placeholder="Hospital Name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                  <Form.Label>Registeration number</Form.Label>
                  <Form.Control onChange={e => sethospitalData({ ...hospitalData, registerNumber: e.target.value })} type="text" placeholder="Register Number" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control onChange={e => sethospitalData({ ...hospitalData, contact: e.target.value })} type="text" placeholder="Phone Number" />
                </Form.Group>
              </Form>
            )
          }

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>{
              role === 'donar' ?
                <Form.Control value={userData.email} onChange={e => setUserData({ ...userData, email: e.target.value })} type="email" placeholder="name@example.com" />
                :
                <Form.Control value={hospitalData.email} onChange={e => sethospitalData({ ...hospitalData, email: e.target.value })} type="email" placeholder="name@example.com" />
            }

          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Password</Form.Label>
            {
              role === 'donar' ?
                <Form.Control value={userData.password} onChange={e => setUserData({ ...userData, password: e.target.value })} type="password" />
                :
                <Form.Control value={hospitalData.password} onChange={e => sethospitalData({ ...hospitalData, password: e.target.value })} type="password" />

            }

          </Form.Group>
          {
            insideRegister ?
              <div className="mb-3 mt-2">
                <button onClick={handleRegister} className="btn btn-primary mb-2">Register</button>
                <p>Already have an account?Click here to <Link to={'/login'}>Login</Link></p>
              </div>
              :
              <div className="mb-3 mt-2">
                <button onClick={handleLogin} className="btn btn-primary mb-2 me-2">Login</button>
                {isloading &&
                                <Spinner animation="border" variant="dark" />

                              }
                <p>New  user?Click here to <Link to={'/register'}>Register</Link></p>
              </div>
          }
        </div>
      </div>

    </div>
  )
}

export default Auth
