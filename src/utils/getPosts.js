import axios from "axios";

export default async function getPosts(setPosts, setSendPost) {
    const token = localStorage.getItem('token')
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/posts`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        setPosts(data)
        if (!!setSendPost) setSendPost(false) //* used in the loader button in the publish post modal
        return true
    } catch (error) {
        console.error(error)
    }
    return false
}