import axios from "axios"

export const signin = async (userData) => {
    try {
        const res = await axios.post("http://localhost:8080/auth/signin", userData, {
            withCredentials: true
        })
        return (res.data)
    } catch (error) {
        console.log(error?.response?.data?.message);
    }

}
export const signup = async (userData) => {
    try {
        const res = await axios.post("http://localhost:8080/auth/signup", userData, {
            withCredentials: true
        })
        return (res.data.message)
    } catch (error) {
        throw new Error(error?.response?.data?.message || "Signup failed")
    }

}
