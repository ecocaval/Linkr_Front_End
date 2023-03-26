import axios from "axios";

export default async function deletePost(
    idOfDeletion,
    setPosts,
    setIdOfDeletion,
    setPostBeingDeleted,
    page,
    extraParam
) {
    const token = localStorage.getItem('token')
    if (!token) return
    try {
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/posts/${idOfDeletion}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        if (response) {
            let posts
            switch (page) {
                case 'home':
                    posts = await axios.get(`${process.env.REACT_APP_API_URL}/posts`, {
                        headers: {
                            authorization: `Bearer ${token}`
                        }
                    })
                    break;
                case 'hashtags':
                    posts = await axios.get(`${process.env.REACT_APP_API_URL}/posts?hashtag=${extraParam}`, {
                        headers: {
                            authorization: `Bearer ${token}`
                        }
                    })
                    break;
                case 'users':
                    posts = await axios.get(`${process.env.REACT_APP_API_URL}/posts/${extraParam}`, {
                        headers: {
                            authorization: `Bearer ${token}`
                        }
                    })
                    break;
                default:
                    break;
            }
            setPosts(posts.data)
        }
        setIdOfDeletion(-Infinity)
    } catch (error) {
        console.log(error)
        alert("Não foi possível excluir o post!")
    }
    setPostBeingDeleted(false)
}