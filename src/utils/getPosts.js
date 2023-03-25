import axios from "axios";

export default async function getPosts(setPosts, setSendPost) {
    const token = localStorage.getItem('token')
    if (!token) return
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/posts`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        setPosts(checkForDuplicityInPosts(data))
        if (!!setSendPost) setSendPost(false) //* used in the loader button in the publish post modal
        return true
    } catch (error) {
        console.error(error)
    }
    return false
}

function checkForDuplicityInPosts(posts) {
    const postsHashTable = {}
    let postsCopy = [...posts]
    let indexesToRemove = []

    for (let i = 0; i < posts.length; i++) {
        if (postsHashTable[posts[i].postId]) {
            indexesToRemove.push(i)
        }
        else postsHashTable[posts[i].postId] = true
    }
    if (indexesToRemove.length) {
        indexesToRemove.forEach(index => {
            postsCopy = postsCopy.splice(index, 1)
        })
        return postsCopy
    }
    return posts
}