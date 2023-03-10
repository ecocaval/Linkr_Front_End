import axios from "axios";

export default async function getPosts(setPosts) {
    const token = localStorage.getItem('token')
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/posts`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        setPosts(data)
    } catch (error) {
        console.error(error)
    }
}