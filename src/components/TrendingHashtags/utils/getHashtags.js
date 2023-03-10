import axios from "axios";

export default async function getHashtags(setHashtags) {
    const token = localStorage.getItem('token')
    try {
        const hashtags = await axios.get(`${process.env.REACT_APP_API_URL}/hashtags`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        setHashtags(hashtags.data)
    } catch (error) {
        console.error(error)
    }
}