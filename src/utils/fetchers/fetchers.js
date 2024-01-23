import axios from "axios"

const token = localStorage.getItem("token")
export const fetchUserDetails = async () => {
    const {data} = await axios.get("http://localhost:4100/api/customerDetails",{
        headers:{
            token
        }
    })
    return data
}