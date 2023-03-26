import getPosts from "./getPosts";

export default async function handleUpdatedPosts(setGotPosts, setUpdatedPosts, setSentPostUpdateRequest) {
    const posts = await getPosts(setUpdatedPosts)
    if(posts) {
        setGotPosts(true)
        setSentPostUpdateRequest(false)
    }
}