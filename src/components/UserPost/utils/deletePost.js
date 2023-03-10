import axios from "axios";

export default async function deletePost(post, setPosts, setPostBeingDeleted, setShowDeleteModal) {
    const token = localStorage.getItem('token')
    try {
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/post/${post.postId}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        if (response) {
            const posts = await axios.get(`${process.env.REACT_APP_API_URL}/posts`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            setPosts(posts.data)
        }
        setPostBeingDeleted(false)
    } catch (error) {
        console.error(error)
    }
    setShowDeleteModal(false)
}