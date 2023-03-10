import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Header from "../../components/Header"
import Loader from "../../components/Loader"
import TrendingHashtags from "../../components/TrendingHashtags"
import UserPost from "../../components/UserPost"
import { HashtagsArea, NoPostText, PostsWrapper, Title } from "./styles"
import getHashtagPosts from "./utils/getHashtagPosts"

export default function HashtagPage() {

    const { hashtag } = useParams()

    const [hashtagPosts, setHashtagPosts] = useState([])
    const [gotPosts, setGotPosts] = useState(false)

    useEffect(() => {
        if(gotPosts) {
            setHashtagPosts([])
            setGotPosts(false)
            getHashtagPosts(hashtag, setHashtagPosts, setGotPosts)
        }
    }, [hashtag])

    return (
        <>
            <Header />
            <HashtagsArea>
                <PostsWrapper>
                    <Title>{`#${hashtag}`}</Title>
                    {
                        hashtagPosts[0] ? hashtagPosts.map((post, index) => <UserPost key={index} post={post} />) :
                            (gotPosts ? <NoPostText>There are no posts yet</NoPostText> : <Loader />)
                    }
                    <TrendingHashtags />
                </PostsWrapper>
            </HashtagsArea>
        </>
    )
}