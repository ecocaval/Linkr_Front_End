import getPosts from "./getPosts";

export default async function handleUpdatedPosts(setUpdatedPosts, setSentPostUpdateRequest) {
    const posts = await getPosts(setUpdatedPosts)
    if (posts) {
        setSentPostUpdateRequest(false)
    }
}