import { useContext, useEffect, useState } from "react"
import useInterval from 'use-interval'
import InfiniteScroll from 'react-infinite-scroller';
import Header from "../../components/Header"
import Loader from "../../components/Loader"
import PagePublishPost from "../../components/PublishPost/PagePublishPost"
import TrendingHashtags from "../../components/TrendingHashtags"
import UpdatePostsModal from "../../components/UpdatePostsModal"
import UserPost from "../../components/UserPost"
import { LoginContext } from "../../contexts/LoginProvider"
import { MobileSearchContext } from "../../contexts/MobileProvider"
import { PostsContext } from "../../contexts/PostsProvider"
import getPosts from "../../utils/getPosts"
import handlePosts from "../../utils/handlePosts"
import handleUpdatedPosts from "../../utils/handleUpdatedPosts"
import { NoPostText } from "../UserPage/styles"
import { HomeArea, PostsWrapper, Title } from "./styles"
import { loadMorePosts } from "./utils/loadMorePosts";
import { UserContext } from "../../contexts/UserProvider";
import { v4 as uuidv4} from "uuid"

export default function Home() {

    const {
        posts,
        updatedPosts,
        setUpdatedPosts,
        postsToUpdate,
        setPostsToUpdate,
        setPosts,
        gotPosts,
        setGotPosts,
        mustUpdatePosts,
        setMustUpdatePosts,
        setSendPost
    } = useContext(PostsContext)

    const { showMobileSearchInput } = useContext(MobileSearchContext)
    const { sentLogin, setSentLogin } = useContext(LoginContext)
    const { myUser } = useContext(UserContext)

    const [scannedAllPosts, setScannedAllPosts] = useState(false)
    const [gettingPosts, setGettingPosts] = useState(false)
    const [hasMorePosts, setHasMorePosts] = useState(false)
    const [sentPostUpdateRequest, setSentPostUpdateRequest] = useState(false)

    useEffect(() => {
        handlePosts(setPosts, setGotPosts)
        // eslint-disable-next-line
    }, [sentLogin, setSentLogin])

    useEffect(() => {
        if (mustUpdatePosts) {
            getPosts(setPosts, setSendPost)
            setMustUpdatePosts(false)
        }
        // eslint-disable-next-line
    }, [mustUpdatePosts])

    useEffect(() => {
        if (updatedPosts.length !== postsToUpdate) {
            for (let i = 0; i < updatedPosts.length; i++) {
                if (updatedPosts[i].postId === posts[0].postId) {
                    setPostsToUpdate(updatedPosts.slice(0, i).length)
                    setUpdatedPosts(updatedPosts.slice(0, i))
                }
            }
        }
        // eslint-disable-next-line
    }, [updatedPosts])

    useInterval(() => {
        if (posts.length > 0 && !sentPostUpdateRequest && posts.length >= 10) {
            setSentPostUpdateRequest(true)
            handleUpdatedPosts(setGotPosts, setUpdatedPosts, setSentPostUpdateRequest)
        }
    }, 15000)

    useEffect(() => {
        if (posts.length !== 0 && !hasMorePosts && !scannedAllPosts && !gettingPosts) {
            setHasMorePosts(true)
        }
        // eslint-disable-next-line
    }, [posts])

    return (
        <>
            <Header />
            <HomeArea showMobileSearchInput={showMobileSearchInput}>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={(page) => {
                        setHasMorePosts(false)
                        setGettingPosts(true)
                        loadMorePosts(page, posts, setScannedAllPosts, setHasMorePosts, setGettingPosts, setPosts)
                    }}
                    useWindow={false}
                    hasMore={hasMorePosts}
                    loader={<Loader key={0} />}
                >
                    <PostsWrapper>
                        <Title>timeline</Title>
                        <PagePublishPost />
                        {postsToUpdate !== 0 && <UpdatePostsModal />}
                        {
                            posts[0] ?
                                posts.map((post, index) =>
                                    <UserPost key={uuidv4()} post={post} postIndex={index} />
                                )
                                : (
                                    gotPosts ?
                                        <NoPostText data-test="message">
                                            {myUser.numberOfFollows > 0 ? "No posts found from your friends" : "You don't follow anyone yet. Search for new friends!"}
                                        </NoPostText> :
                                        <Loader />
                                )
                        }
                        {gettingPosts && <Loader />}
                        <TrendingHashtags />
                    </PostsWrapper>
                </InfiniteScroll>
            </HomeArea>
        </>
    )
}