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
import { v4 as uuidv4 } from "uuid"
import Modal from "../../components/Modal";
import deletePost from "../../components/UserPost/utils/deletePost";
import { Blocks } from "react-loader-spinner";

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

    const [postBeingCommented, setPostBeingCommented] = useState(false)
    const [postBeingEdited, setPostBeingEdited] = useState(false)
    const [postBeingDeleted, setPostBeingDeleted] = useState(false)
    const [idOfComment, setIdOfComment] = useState(-Infinity)
    const [idOfEdition, setIdOfEdition] = useState(-Infinity)
    const [idOfDeletion, setIdOfDeletion] = useState(-Infinity)
    const [scannedAllPosts, setScannedAllPosts] = useState(false)
    const [gettingPosts, setGettingPosts] = useState(false)
    const [hasMorePosts, setHasMorePosts] = useState(false)
    const [sentPostUpdateRequest, setSentPostUpdateRequest] = useState(false)

    useEffect(() => {
        setGotPosts(false)
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
        if (posts.length > 0 && !sentPostUpdateRequest && !postBeingEdited && !postBeingCommented) {
            setSentPostUpdateRequest(true)
            handleUpdatedPosts(setUpdatedPosts, setSentPostUpdateRequest)
        }
    }, 15000)

    useEffect(() => {
        if (posts.length !== 0 && !hasMorePosts && !scannedAllPosts && !gettingPosts) {
            setHasMorePosts(true)
        }
        // eslint-disable-next-line
    }, [posts])

    useEffect(() => {
        if (idOfEdition >= 0) setPostBeingEdited(true)
        else if (postBeingEdited) setPostBeingEdited(false)
        // eslint-disable-next-line
    }, [idOfEdition])

    useEffect(() => {
        if (idOfComment >= 0) setPostBeingCommented(true)
        else if (postBeingCommented) setPostBeingCommented(false)
        // eslint-disable-next-line
    }, [idOfComment])

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
                            gotPosts ? (
                                posts[0] ?
                                    posts.map((post, index) => <UserPost
                                        key={uuidv4()}
                                        post={post}
                                        postIndex={index}
                                        page={'home'}
                                        idOfEdition={idOfEdition}
                                        setIdOfEdition={setIdOfEdition}
                                        setIdOfDeletion={setIdOfDeletion}
                                        idOfComment={idOfComment}
                                        setIdOfComment={setIdOfComment}
                                    />
                                    ) : (
                                        <NoPostText data-test="message">
                                            {myUser.numberOfFollows > 0 ? "No posts found from your friends" : "You don't follow anyone yet. Search for new friends!"}
                                        </NoPostText>
                                    )
                            ) : <Loader />
                        }
                        {gettingPosts && <Loader />}
                        <TrendingHashtags />
                    </PostsWrapper>
                </InfiniteScroll>
            </HomeArea>
            {
                idOfDeletion >= 0 &&
                <Modal setIdOfDeletion={setIdOfDeletion}>
                    <p>Are you sure you want to delete this post?</p>
                    <div>
                        <button
                            data-test="cancel"
                            onClick={() => { setIdOfDeletion(-Infinity) }}
                            disabled={postBeingDeleted}
                        >
                            No, go back
                        </button>
                        <button
                            data-test="confirm"
                            onClick={() => {
                                setPostBeingDeleted(true)
                                deletePost(idOfDeletion, setPosts, setIdOfDeletion, setPostBeingDeleted, 'home')
                            }}
                            disabled={postBeingDeleted}
                            style={{ overflow: 'hidden' }}
                        >
                            {postBeingDeleted ?
                                <Blocks
                                    visible={true}
                                    height="40"
                                    width="40"
                                    ariaLabel="blocks-loading"
                                    wrapperClass="blocks-wrapper"
                                    style={{ overflow: 'hidden' }}
                                />
                                : "Yes, delete it"}
                        </button>
                    </div>
                </Modal>
            }
        </>
    )
}