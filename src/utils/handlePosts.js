import getPosts from "./getPosts";

export default async function handlePosts(setPosts, setGotPosts) {
    const posts = await getPosts(setPosts)
    if (posts) {
        setGotPosts(true)
    }
}
