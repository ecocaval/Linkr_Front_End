import getPosts from "./getPosts";

export default async function handlePosts(setPosts,setGotPosts) {
    setGotPosts(await getPosts(setPosts))
}
