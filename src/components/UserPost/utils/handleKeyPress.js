import editPost from "./editPost";

export default function handleKeyPress(event, post, description, setDescription, posts, setPosts, setEditPostMode, setHashtagPosts) {
    console.log(event.key)
    if (event.key === 'Enter') {
        editPost(post, description, posts, setPosts, setEditPostMode, setHashtagPosts)
    } else if (event.key === 'Escape') {
        setEditPostMode(false)
        setDescription(post.postDesc)
    }
}