import axios from "axios";

export default async function getUserPosts(id) {
    const token = localStorage.getItem('token')
    if(!token) return  
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/posts/${id}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        return data
    } catch (error) {
        console.error(error)
    }
}