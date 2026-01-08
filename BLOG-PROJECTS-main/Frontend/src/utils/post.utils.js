import axios from "axios"
export const getPost = async () => {
    try {
        const res = await axios.get("http://localhost:8080/blog/", {
            withCredentials: true
        })
        return (res.data)

    } catch (error) {
        console.log(error.message)
    }


}
export const createPost = async (postData) => {
    try {
        const res = await axios.post("http://localhost:8080/blog/", postData, {
            withCredentials: true
        })
        return res.message
    } catch (error) {
        console.log(error.message)
    }
}

export const UpdatePost = async (id, form) => {
    try {
        const res = await axios.put(`http://localhost:8080/blog/${id}`, form, {
            withCredentials: true
        })
        return res.data
    } catch (error) {
        console.log(error.message)
        throw error
    }
}
export const DeletePost = async (id) => {
    try {
        const res = await axios.delete(`http://localhost:8080/blog/${id}`, {
            withCredentials: true
        })
        return res.data
    } catch (error) {
        console.log(error?.response?.data?.message)
    }
}