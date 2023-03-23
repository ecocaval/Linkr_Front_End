import getPosts from "./getPosts";

export default async function handleUpdatedPosts(setGotPosts, setUpdatedPosts) {
    setGotPosts(await getPosts(setUpdatedPosts))
}