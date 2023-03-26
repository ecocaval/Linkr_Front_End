import editPost from "./editPost";

export default function handleKeyPress(
    event,
    post,
    description,
    setDescription,
    posts,
    setPosts,
    setIdOfEdition,
    setSentEditRequest
) {
    if (event.key === 'Enter') {
        setSentEditRequest(true)
        editPost(post, description, posts, setPosts, setIdOfEdition, setSentEditRequest)
    } else if (event.key === 'Escape') {
        setIdOfEdition(-Infinity)
        setDescription(post.postDesc)
    }
}