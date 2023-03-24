import axios from "axios"

export async function loadMorePosts(page, posts, setScannedAllPosts, setHasMorePosts, setGettingPosts, setPosts) {
    if (posts.length === 0) return
    const token = localStorage.getItem('token')
    try {
        const { data: newPosts } = await axios.get(`${process.env.REACT_APP_API_URL}/posts?postsOffset=${page}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        if (!newPosts || newPosts.length === 0) {
            setScannedAllPosts(true)
            setHasMorePosts(false)
            setGettingPosts(false)
            return
        }
        setPosts([...posts, ...newPosts])
        setGettingPosts(false)
    } catch (error) {
        console.log(error)
    }
}