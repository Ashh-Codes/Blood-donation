import React, { useContext, useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap';
import profilepic from '../assets/profile.jpeg'
import { authContext } from '../contexts/RoleContext';
import SERVERURL from '../services/serverURL';
import { editHospitalAPI, editUserAPI } from '../services/allAPI';

const Profile = () => {
    const [preview,setpreview] =useState("")
  const [existingUserImg,setexistingUserImg] =useState("")
  const [existingHospitalImg,setexistingHospitalImg] =useState("")

  
    const {donarResponse,setdonarResponse} =useContext(authContext)
    const [profile,setprofile] =useState({
        
        emailHospital:"",
        passwordHospital:"",
        hospitalname:"",
        registerNumber:"",
        contact:"",
        hospitalPic:""
    })
    
    const [userProfile,setuserProfile]=useState({
        
        username:"",
        email:"",
        password:"",
        profilePic:""
        
    })
    console.log(userProfile);
    const [open, setOpen] = useState(false);
    console.log(`${donarResponse} is response`);
    
    useEffect(()=>{
        if(donarResponse==='hospital'){
        const profileData=  JSON.parse(sessionStorage.getItem("hospital"))
        setprofile({...profile,emailHospital:profileData.email,passwordHospital:profileData.password,hospitalname:profileData.hospitalname,registerNumber:profileData.registerNumber,contact:profileData.contact})
        setexistingHospitalImg(profileData.hospitalPic)

        }
        else if(donarResponse==='donar'){
            
            const userData=  JSON.parse(sessionStorage.getItem("user"))
            
            setuserProfile({...userProfile,username:userData.username,email:userData.email,password:userData.password})
            setexistingUserImg(userData.profilePic)
        }
    },[open])
    useEffect(()=>{
        if(profile.hospitalPic){
            setpreview(URL.createObjectURL(profile.hospitalPic))
        }
        else if(userProfile.profilePic){
            setpreview(URL.createObjectURL(userProfile.profilePic))
        }else{
            setpreview("")
        }
    },[profile.hospitalPic,userProfile.profilePic])

    const handleProfileUpdate=async()=>{
        const {emailHospital,passwordHospital,hospitalname,registerNumber,contact,hospitalPic} =profile
        const {username,email,password,profilePic} = userProfile
        if(donarResponse==='hospital'){
            if(emailHospital&&hospitalname){
                const reqBody=new FormData()
                reqBody.append("email",emailHospital)
                reqBody.append("password",passwordHospital)
                reqBody.append("hospitalname",hospitalname)
                reqBody.append("registerNumber",registerNumber)
                reqBody.append("contact",contact)
                preview?reqBody.append("hospitalPic",hospitalPic):reqBody.append("hospitalPic",existingHospitalImg)
                const token=sessionStorage.getItem("token")
                if(token){
                  const reqHeader={
                    "Content-Type":preview?"multipart/form-data":"application/json",
                    "Authorization":`Bearer ${token}`
                  }
                  try {
                    const result=await editHospitalAPI(reqBody,reqHeader)
                    if(result.status==200){
                        sessionStorage.setItem("hospital",JSON.stringify(result.data))
                        setOpen(!open)
                    }else{
                        console.log(result);
                        
                    }
                  } catch (err) {
                    console.log(err);
                    
                  }
                }
            
            }else{
                alert("Please fill the form completely...")
            }
        }
        else{
            if(username&&email){
                const reqBody=new FormData()
                reqBody.append("username",username)
                reqBody.append("email",email)
                reqBody.append("password",password)
                
                preview?reqBody.append("profilePic",profilePic):reqBody.append("profilePic",existingUserImg)
                const token=sessionStorage.getItem("token")
                if(token){
                  const reqHeader={
                    "Content-Type":preview?"multipart/form-data":"application/json",
                    "Authorization":`Bearer ${token}`
                  }
                  try {
                    console.log(reqBody);
                    console.log(reqHeader);
                    const result=await editUserAPI(reqBody,reqHeader)
                    if(result.status==200){
                        sessionStorage.setItem("user",JSON.stringify(result.data))
                        setOpen(!open)
                    }else{
                        console.log(result);
                        
                    }
                  } catch (err) {
                    console.log(err);
                    
                  }
                }
            
            }else{
                alert("Please fill the form completely...")
            }
        }
    }
   
    return (
        <div>
            <div className="d-flex justify-content-evenly">
                <h3 className="text-primary">
                    Profile
                </h3>
                <button onClick={()=>setOpen(!open)} className="btn text-primary fw-bolder">
                    <i className='fa-solid fa-chevron-down'></i>
                </button>
            </div>
            <Collapse in={open}>
        <div className='row align-items-center justify-content-center shadow rounded p-2' id="example-collapse-text">
       
        <div> 
            <label className='text-center mb-2'> 
                {
                donarResponse === 'hospital' ? 
                (
                     <>
                 <input onChange={e => setProfile({ ...profile, hospitalPic: e.target.files[0] })} style={{ display: 'none' }} type="file" /> 
                 {existingHospitalImg === "" ?
                  ( <img width="200px" height="200px" className="rounded-circle" src={preview?preview:profilepic} alt="Hospital" /> )
                   :
                    ( <img width="200px" height="200px" className="rounded-circle" src={preview?preview:`${SERVERURL}/uploads/${existingHospitalImg}`} alt="Hospital" /> )}
                     </>
                     )
                      :
                       (
                         <> 
                         <input onChange={e => setUserProfile({ ...userProfile, profilePic: e.target.files[0] })} style={{ display: 'none' }} type="file" />
                         
                          {existingUserImg === "" ?
                           ( <img width="200px" height="200px" className="rounded-circle" src={preview?preview:profilepic} alt="User" /> ) 
                           : ( <img width="200px" height="200px" className="rounded-circle" src={preview?preview:`${SERVERURL}/uploads/${existingUserImg}`} alt="User" /> )}
                            </> )} </label>
         </div>
            
            <div className="mb-2">
                {
                    donarResponse==='hospital'?
                    <input onChange={e=>setprofile({...profile,emailHospital:e.target.value})} value={profile.emailHospital} type="email" placeholder='Email' className='form-control' />:
                    <input onChange={e=>setuserProfile({...userProfile,email:e.target.value})} value={userProfile.email} type="email" placeholder='Email' className='form-control' />
                }
                
            </div>
            <div className="mb-2">
                {
                     donarResponse==='hospital'?
                     <input onChange={e=>setprofile({...profile,hospitalname:e.target.value})} value={profile.hospitalname}  type="text" placeholder='Name' className='form-control' />:
                     <input onChange={e=>setuserProfile({...userProfile,username:e.target.value})} value={userProfile.username}  type="text" placeholder='username' className='form-control' />


                }
            </div>
            
            <div className="d-grid">
                <button onClick={handleProfileUpdate} className='btn btn-primary'>Update Profile</button>
            </div>
        </div>
      </Collapse>
      
        </div>
    )
}

export default Profile
