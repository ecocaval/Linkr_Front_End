import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Header from "../../components/Header"
import Loader from "../../components/Loader"
import TrendingHashtags from "../../components/TrendingHashtags"
import UserPost from "../../components/UserPost"
import { PostsContext } from "../../contexts/PostsContext"
import { HashtagsArea, NoPostText, PostsWrapper, Title } from "./styles"
import getHashtagPosts from "./utils/getHashtagPosts"

export default function HashtagPage() {

    const { hashtag } = useParams()
    const {hashtagPosts, setHashtagPosts} = useContext(PostsContext)
    const [gotPosts, setGotPosts] = useState(false)
    const [firstRender, setFirstRender] = useState(true)

    useEffect(() => {
        if (gotPosts || firstRender) {
            setHashtagPosts([])
            setGotPosts(false)
            getHashtagPosts(hashtag, setHashtagPosts, setGotPosts)
            if (firstRender) setFirstRender(false)
        }
        // eslint-disable-next-line 
    }, [hashtag])

    return (
        <>
            <Header />
            <HashtagsArea>
                <PostsWrapper>
                    <Title data-test="hashtag-title" >{`#${hashtag}`}</Title>
                    {
                        hashtagPosts[0] ? hashtagPosts.map((post, index) => <UserPost key={index} post={post} />) :
                            (gotPosts ? <NoPostText data-test="message">There are no posts yet</NoPostText> : <Loader />)
                    }
                    <TrendingHashtags />
                </PostsWrapper>
            </HashtagsArea>
        </>
    )
}