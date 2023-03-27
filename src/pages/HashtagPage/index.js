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
import Modal from "../../components/Modal"
import deletePost from "../../components/UserPost/utils/deletePost"
import { Blocks } from "react-loader-spinner"

export default function HashtagPage() {

    const { hashtag } = useParams()

    const { hashtagPosts, setHashtagPosts } = useContext(PostsContext)
    const { showMobileSearchInput } = useContext(MobileSearchContext)

    const [postBeingCommented, setPostBeingCommented] = useState(false)
    const [postBeingEdited, setPostBeingEdited] = useState(false)
    const [postBeingDeleted, setPostBeingDeleted] = useState(false)
    const [idOfComment, setIdOfComment] = useState(-Infinity)
    const [idOfDeletion, setIdOfDeletion] = useState(-Infinity)
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
                                        setIdOfDeletion={setIdOfDeletion}
                                        idOfComment={idOfComment}
                                        setIdOfComment={setIdOfComment}
                                    />) :
                                <NoPostText data-test="message">There are no posts yet</NoPostText>) :
                            <Loader />
                    }
                    <TrendingHashtags />
                </PostsWrapper>
            </HashtagsArea>
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
                                deletePost(idOfDeletion, setHashtagPosts, setIdOfDeletion, setPostBeingDeleted, 'hashtags', hashtag)
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