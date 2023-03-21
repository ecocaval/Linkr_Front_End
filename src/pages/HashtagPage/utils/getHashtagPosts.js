import axios from "axios";

export default async function getHashtagPosts(hashtag, setHashtagPosts, setGotPosts) {
    const token = localStorage.getItem('token')
    if(!token) return    
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/posts?hashtag=${hashtag}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        setHashtagPosts(data)
        setGotPosts(true)
        return true
    } catch (error) {
        console.error(error)
    }
    return false
}