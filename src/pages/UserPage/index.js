import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ButtonFollow from "../../components/ButtonFollow"
import Header from "../../components/Header"
import Loader from "../../components/Loader"
import TrendingHashtags from "../../components/TrendingHashtags"
import UserPost from "../../components/UserPost"
import { MobileSearchContext } from "../../contexts/MobileProvider"
import { UserContext } from "../../contexts/UserProvider"
import { NoPostText, PostsWrapper, Title, TrendingWrapper, UserArea } from "./styles"
import getUserPosts from "./utils/getUserPosts"
import getPageUser from "./utils/getPageUser"
import { v4 as uuidv4 } from "uuid"
import { PostsContext } from "../../contexts/PostsProvider"
import Modal from "../../components/Modal"
import deletePost from "../../components/UserPost/utils/deletePost"
import { Blocks } from "react-loader-spinner"

export default function UserPage() {
    const { id } = useParams()

    const [postBeingCommented, setPostBeingCommented] = useState(false)
    const [postBeingEdited, setPostBeingEdited] = useState(false)
    const [postBeingDeleted, setPostBeingDeleted] = useState(false)
    const [idOfComment, setIdOfComment] = useState(-Infinity)
    const [idOfDeletion, setIdOfDeletion] = useState(-Infinity)
    const [idOfEdition, setIdOfEdition] = useState(-Infinity)

    const { myUser, userSelected, setUserSelected } = useContext(UserContext)
    const { userPosts, setUserPosts, gotPosts, setGotPosts } = useContext(PostsContext)
    const { showMobileSearchInput } = useContext(MobileSearchContext)

    async function handleUserPosts() {
        const posts = await getUserPosts(id)
        if (posts) {
            setUserPosts(posts)
            setGotPosts(true)
        }
    }

    useEffect(() => {
        setGotPosts(false)
        if (!userSelected) {
            getPageUser(setUserSelected, id)
        }
        handleUserPosts()
        // eslint-disable-next-line
    }, [id, userSelected])

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
            <UserArea showMobileSearchInput={showMobileSearchInput}>
                <PostsWrapper>
                    <div>
                        <img
                            src={userSelected?.image}
                            style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "25px",
                            }}
                            alt="User img"
                            data-test="avatar"
                        />
                        <Title>{`${userSelected?.name}'s posts`}</Title>
                    </div>
                    {
                        gotPosts ?
                            (userPosts[0] ?
                                userPosts.map((post, index) =>
                                    <UserPost
                                        key={uuidv4()}
                                        post={post}
                                        postIndex={index}
                                        page={'users'}
                                        idOfEdition={idOfEdition}
                                        setIdOfEdition={setIdOfEdition}
                                        setIdOfDeletion={setIdOfDeletion}
                                        idOfComment={idOfComment}
                                        setIdOfComment={setIdOfComment}
                                    />) :
                                <NoPostText data-test="message">There are no posts yet</NoPostText>) :
                            <Loader />
                    }
                    <TrendingWrapper>
                        <TrendingHashtags />
                    </TrendingWrapper>
                    {myUser.id !== Number(id) && <ButtonFollow />}
                </PostsWrapper>
            </UserArea>
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
                                deletePost(idOfDeletion, setUserPosts, setIdOfDeletion, setPostBeingDeleted, 'users', id)
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