import { Avatar, Header, Icons, Infos, Left, LinkArea, PostArea, Right, TextArea } from "./styles";
import { IoHeartOutline, IoTrashSharp, IoPencilSharp, IoHeartSharp } from "react-icons/io5";
import { useContext, useRef, useState } from "react";
import Modal from "../Modal";
import deletePost from "./utils/deletePost";
import { PostsContext } from "../../contexts/PostsProvider";
import { Blocks } from 'react-loader-spinner';
import { UserContext } from "../../contexts/UserProvider";
import { useNavigate } from "react-router-dom";
import handleKeyPress from "./utils/handleKeyPress";
import axios from "axios";
import { ReactTagify } from "react-tagify";

export default function UserPost({ post }) {
    const navigate = useNavigate();

    const { posts, setPosts } = useContext(PostsContext)
    const { setUserSelected } = useContext(UserContext)

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [postBeingDeleted, setPostBeingDeleted] = useState(false)
    const [editPostMode, setEditPostMode] = useState(false)
    const [description, setDescription] = useState(post.postDesc)

    const keyPressRef = useRef(null)

    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')

    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(Number(post.likesCount));

    async function toggleLike() {
        if (liked) setLikesCount(likesCount - 1)
        else setLikesCount(likesCount + 1)

        setLiked(!liked)

        let data = {
            post_id: post.postId,
            user_id: userId
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        try {
            await axios.post(process.env.REACT_APP_API_URL + '/posts/toggle-like', data, config)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <PostArea data-test="post">
                <Left>
                    <Avatar src={post.userImage} onClick={() => {
                        setUserSelected({
                            id: post.userId,
                            name: post.userName,
                            image: post.userImage
                        })
                        navigate(`/user/${post.userId}`)
                    }} />
                    {liked ?
                        <div data-test="like-btn" onClick={toggleLike}>
                            <IoHeartSharp className="heart-sharp-icon" />
                        </div>
                        :
                        <div data-test="like-btn" onClick={toggleLike}>
                            <IoHeartOutline className="heart-outline-icon" />
                        </div>
                    }
                    <div data-test="counter" className="likes-count">{likesCount} likes</div>
                </Left>
                <Right>
                    <Infos>
                        <Header>
                            <div className="user-name" data-test="username">{post.userName}</div>
                            <Icons>
                                {
                                    post.userCanDeletePost &&
                                    <>
                                        <IoPencilSharp
                                            className="icon"
                                            onClick={() => {
                                                setEditPostMode(!editPostMode)
                                                if (!!editPostMode) setDescription(post.postDesc)
                                            }}
                                            data-test="edit-btn"
                                        />
                                        <IoTrashSharp
                                            className="icon"
                                            onClick={() => { setShowDeleteModal(!showDeleteModal) }}
                                            data-test="delete-btn"
                                        />
                                    </>
                                }
                            </Icons>
                        </Header>
                        {
                            editPostMode && <TextArea
                                name="description"
                                ref={keyPressRef}
                                onKeyDown={(e) => {
                                    handleKeyPress(e, post, description, setDescription, posts, setPosts, setEditPostMode)
                                }}
                                data-test="edit-input"
                                onChange={(e) => { setDescription(e.target.value) }}
                                value={description}
                            />
                        }
                        {
                            !editPostMode &&
                            <ReactTagify
                                colors={"white"} 
                                tagClicked={(tag)=> navigate(`/hashtag/${tag.replace("#", "")}`)}
                            >
                                <div
                                className="description"
                                data-test="description"
                            >
                                {post.postDesc}
                            </div>
                            </ReactTagify>
                        }
                        <LinkArea data-test="link" href={post.linkData.url} target="_blank">
                            <div className="left">
                                <div className="title">{post.linkData.title}</div>
                                <div className="subtitle">
                                    {post.linkData.description}
                                </div>
                                <div className="link">
                                    {post.linkData.url}
                                </div>
                            </div>
                            <div className="right">
                                <img src={post.linkData.image} alt="" />
                            </div>
                        </LinkArea>
                    </Infos>
                </Right>
            </PostArea>
            {
                showDeleteModal &&
                <Modal setShowModal={setShowDeleteModal}>
                    <p>Are you sure you want to delete this post?</p>
                    <div>
                        <button
                            data-test="cancel"
                            onClick={() => { setShowDeleteModal(false) }}
                            disabled={postBeingDeleted}
                        >
                            No, go back
                        </button>
                        <button
                            data-test="confirm"
                            onClick={() => {
                                setPostBeingDeleted(true)
                                deletePost(post, setPosts, setPostBeingDeleted, setShowDeleteModal)
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
