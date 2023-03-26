import { createContext, useState } from "react";

export const PostsContext = createContext();

export function PostsProvider({ children }) {

    const [posts, setPosts] = useState([])
    const [userPosts, setUserPosts] = useState([])
    const [hashtagPosts, setHashtagPosts] = useState([])
    const [updatedPosts, setUpdatedPosts] = useState([])
    const [postsToUpdate, setPostsToUpdate] = useState(0)
    const [mustUpdatePosts, setMustUpdatePosts] = useState(false)
    const [sendPost, setSendPost] = useState(false)
    const [gotPosts, setGotPosts] = useState(false)

    return (
        <PostsContext.Provider
            value={{
                posts, setPosts,
                userPosts, setUserPosts,
                hashtagPosts, setHashtagPosts,
                updatedPosts, setUpdatedPosts,
                postsToUpdate, setPostsToUpdate,
                mustUpdatePosts, setMustUpdatePosts,
                sendPost, setSendPost,
                gotPosts, setGotPosts
            }}
        >
            {children}
        </PostsContext.Provider>
    )
}