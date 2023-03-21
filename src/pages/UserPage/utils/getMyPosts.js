import axios from "axios";

export default async function getMyPosts(setUserPosts, setGotPosts) {
    const token = localStorage.getItem('token')
    if(!token) return  
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/posts?getMyUser=true`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        setUserPosts(data)
        setGotPosts(true)
    } catch (error) {
        console.error(error)
    }
}