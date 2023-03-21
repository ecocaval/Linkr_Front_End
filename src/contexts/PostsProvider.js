import { createContext, useState } from "react";

export const PostsContext = createContext();

export function PostsProvider({ children }) {

    const [posts, setPosts] = useState([])
    const [mustUpdatePosts, setMustUpdatePosts] = useState(false)
    const [sendPost, setSendPost] = useState(false)
    const [gotPosts, setGotPosts] = useState(false)

    return (
        <PostsContext.Provider
            value={{
                posts, 
                setPosts,
                mustUpdatePosts, 
                setMustUpdatePosts, 
                sendPost, 
                setSendPost, 
                gotPosts,
                setGotPosts
            }}
        >
            {children}
        </PostsContext.Provider>
    )
}