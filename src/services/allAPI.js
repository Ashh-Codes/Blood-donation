import commonAPI from "./commonAPI";
import SERVERURL from "./serverURL";

//registerUser
export const registerUserAPI=async(reqBody)=>{
    console.log(reqBody);
    console.log("inside commonapi");
    
    
    return await commonAPI("POST",`${SERVERURL}/registerUser`,reqBody)
    
    
}
export const registerHospitalAPI=async(reqBody)=>{
    return await commonAPI("POST",`${SERVERURL}/registerHospital`,reqBody)
}

export const loginUserAPI=async(reqBody)=>{
    return await commonAPI("POST",`${SERVERURL}/loginUser`,reqBody)
}
export const loginHospitalAPI=async(reqBody)=>{
    return await commonAPI("POST",`${SERVERURL}/loginHospital`,reqBody)
}

export const addDonarAPI=async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVERURL}/add-donar`,reqBody,reqHeader)
}

export const addCampAPI=async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVERURL}/add-camp`,reqBody,reqHeader)
}

export const homeCampAPI=async()=>{
    return await commonAPI("GET",`${SERVERURL}/home-camps`,"")
}

export const allCampAPI=async(reqHeader)=>{
    return await commonAPI("GET",`${SERVERURL}/all-camps`,"",reqHeader)
}


export const allDonarsAPI=async(searchKey)=>{
    return await commonAPI("GET",`${SERVERURL}/all-donars?search=${searchKey}`,"")
}

export const deleteDonarAPI=async(pid,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVERURL}/${pid}/remove-donar`,{},reqHeader)
}

export const getAllHospitalAPI=async(reqHeader)=>{
    return await commonAPI("GET",`${SERVERURL}/all-hospitals`,"",reqHeader)
}

export const deleteCampAPI=async(cid,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVERURL}/${cid}/remove-camp`,{},reqHeader)
}

export const editCampAPI=async(cid,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVERURL}/${cid}/edit-camp`,reqBody,reqHeader)
}

export const editHospitalAPI=async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVERURL}/hospital/edit`,reqBody,reqHeader)
}

export const editUserAPI=async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVERURL}/user/edit`,reqBody,reqHeader)
}

export const getAllHospitalCampsAPI = async(hospitalEmail,reqHeader)=>{
    return await commonAPI("GET",`${SERVERURL}/all-hospitalCamps?hospitalEmail=${hospitalEmail}`,"",reqHeader)
}

export const addBokkingAPI=async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVERURL}/add-booking`,reqBody,reqHeader)
}


export const getAllBookingsAPI = async(userEmail,reqHeader)=>{
    return await commonAPI("GET",`${SERVERURL}/all-campBookings?userEmail=${userEmail}`,"",reqHeader)
}