import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Header from "../../components/Header"
import Loader from "../../components/Loader"
import TrendingHashtags from "../../components/TrendingHashtags"
import UserPost from "../../components/UserPost"
import { MobileSearchContext } from "../../contexts/MobileProvider"
import { PostsContext } from "../../contexts/PostsProvider"
import { HashtagsArea, NoPostText, PostsWrapper, Title } from "./styles"
import getHashtagPosts from "./utils/getHashtagPosts"
import { v4 as uuidv4 } from "uuid"

export default function HashtagPage() {

    const { hashtag } = useParams()

    const { hashtagPosts, setHashtagPosts } = useContext(PostsContext)
    const { showMobileSearchInput } = useContext(MobileSearchContext)

    const [idOfEdition, setIdOfEdition] = useState(-Infinity)
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
            <HashtagsArea showMobileSearchInput={showMobileSearchInput}>
                <PostsWrapper>
                    <Title data-test="hashtag-title" >{`#${hashtag}`}</Title>
                    {
                        gotPosts ?
                            (hashtagPosts[0] ?
                                hashtagPosts.map((post, index) =>
                                    <UserPost
                                        key={uuidv4()}
                                        post={post}
                                        postIndex={index}
                                        page={'hashtags'}
                                        idOfEdition={idOfEdition}
                                        setIdOfEdition={setIdOfEdition}
                                    />) :
                                <NoPostText data-test="message">There are no posts yet</NoPostText>) :
                            <Loader />
                    }
                    <TrendingHashtags />
                </PostsWrapper>
            </HashtagsArea>
        </>
    )
}