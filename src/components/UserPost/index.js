import { Avatar, Header, Icons, Infos, Left, LinkArea, PostArea, Right, SharedByArea, TextArea, PostContent, PostComments, PostComment, InputCommentArea, CommentsArea } from "./styles";
import { IoHeartOutline, IoTrashSharp, IoPencilSharp, IoHeartSharp, IoChatbubblesOutline, IoSend } from "react-icons/io5";
import { BiRepost } from "react-icons/bi"
import { useContext, useEffect, useRef, useState } from "react";
import Modal from "../Modal";
import deletePost from "./utils/deletePost";
import { PostsContext } from "../../contexts/PostsProvider";
import { Blocks } from 'react-loader-spinner';
import { UserContext } from "../../contexts/UserProvider";
import { useNavigate } from "react-router-dom";
import handleKeyPress from "./utils/handleKeyPress";
import axios from "axios";
import { ReactTagify } from "react-tagify";
import { Tooltip } from 'react-tooltip';
import { getUserLikesText } from "./utils/getUserLikesText";

export default function UserPost({ post, postIndex, page }) {
    const navigate = useNavigate();

    const { myUser, setUserSelected } = useContext(UserContext)
    const {
        posts,
        setPosts,
        userPosts,
        setUserPosts,
        hashtagPosts,
        setHashtagPosts
    } = useContext(PostsContext)

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [postBeingDeleted, setPostBeingDeleted] = useState(false)
    const [editPostMode, setEditPostMode] = useState(false)
    const [description, setDescription] = useState(post.postDesc)
    const [showComments, setShowComments] = useState(false)
    const [postComments, setPostComments] = useState([]);
    const [commentDesc, setCommentDesc] = useState('');

    const keyPressRef = useRef(null)

    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')

    useEffect(() => {
        getPostComments()
        // eslint-disable-next-line
    }, []);

    async function getPostComments() {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        try {
            let comments = await axios.get(process.env.REACT_APP_API_URL + `/posts/comments/${post.postId}`, config)
            setPostComments(comments.data);
        } catch (error) {
            console.log(error)
        }
    }

    async function addComment() {
        if (commentDesc.length === 0) return

        let data = {
            post_id: post.postId,
            user_id: userId,
            description: commentDesc
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        try {
            await axios.post(process.env.REACT_APP_API_URL + '/posts/comments', data, config)
            setCommentDesc('')
            getPostComments()
        } catch (error) {
            console.log(error);
        }
    }

    async function toggleLike() {
        let postsCopy

        switch (page) {
            case 'home':
                postsCopy = [...posts]
                break;
            case 'users':
                postsCopy = [...userPosts]
                break;
            case 'hashtags':
                postsCopy = [...hashtagPosts]
                break;
            default:
                break;
        }

        postsCopy[postIndex].likedByUser = !postsCopy[postIndex].likedByUser

        if (!postsCopy[postIndex].likedByUser) {
            postsCopy[postIndex].likesCount = Number(postsCopy[postIndex].likesCount) - 1
            postsCopy[postIndex].usersThatLiked = postsCopy[postIndex].usersThatLiked.filter(user => user.user_id !== myUser.id)
        } else {
            postsCopy[postIndex].likesCount = Number(postsCopy[postIndex].likesCount) + 1
            if (!postsCopy[postIndex].usersThatLiked) postsCopy[postIndex].usersThatLiked = []
            postsCopy[postIndex].usersThatLiked.push({ user_id: myUser.id, name: myUser.name })

        }

        switch (page) {
            case 'home':
                setPosts(postsCopy)
                break;
            case 'users':
                setUserPosts(postsCopy)
                break;
            case 'hashtags':
                setHashtagPosts(postsCopy)
                break;
            default:
                break;
        }

        setPosts(postsCopy)

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

    async function sharePost() {
        const data = {
            postId: post.postId,
            userId
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        try {
            await axios.post(process.env.REACT_APP_API_URL + '/posts/share', data, config)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <SharedByArea isShared={post.isShared}>
                <BiRepost />
                <p>Re-posted by <span>{post.sharedUser}</span></p>
            </SharedByArea>
            <PostArea data-test="post">
                <PostContent>
                    <Left>
                        <Avatar src={post.userImage} onClick={() => {
                            setUserSelected({
                                id: post.userId,
                                name: post.userName,
                                image: post.userImage
                            })
                            navigate(`/user/${post.userId}`)
                        }} />
                        {/* Likes */}
                        <Tooltip id="my-tooltip" >
                            {getUserLikesText(post.usersThatLiked)}
                        </Tooltip>
                        {post.likedByUser ?
                            <div data-tooltip-id="my-tooltip" data-test="like-btn" onClick={toggleLike}>
                                <IoHeartSharp className="heart-sharp-icon" />
                            </div>
                            :
                            <div data-tooltip-id="my-tooltip" data-test="like-btn" onClick={toggleLike}>
                                <IoHeartOutline className="heart-outline-icon" />
                            </div>
                        }
                        <div data-test="counter" className="count-text">{post.likesCount} like{post.likesCount > 1 ? "s" : ""}</div>

                        {/* Comments */}
                        <div onClick={() => setShowComments(!showComments)}>
                            <IoChatbubblesOutline className="chat-icon" />
                        </div>
                        <div className="count-text">{postComments.length} comments</div>

                        {/* Reposts */}
                        <BiRepost className="repost-icon" onClick={sharePost} />
                        <div className="count-text">0 re-posts</div>
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
                                    tagClicked={(tag) => navigate(`/hashtag/${tag.replace("#", "")}`)}
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
                </PostContent>

                {/* Comments */}
                {showComments &&
                    <CommentsArea>
                        <PostComments>
                            {postComments.map(comment => (
                                <PostComment key={comment.id}>
                                    <img src={comment.user_photo} className="avatar" alt=""></img>
                                    <div className="content">
                                        <div className="user-name">
                                            {comment.user_name}
                                            <span> • following</span>
                                        </div>
                                        <div className="text-comment">
                                            {comment.description}
                                        </div>
                                    </div>
                                </PostComment>
                            ))}
                        </PostComments>
                        <InputCommentArea>
                            <img src={myUser.image} className="avatar" alt=""></img>
                            <input
                                value={commentDesc}
                                onChange={(e) => setCommentDesc(e.target.value)}
                                placeholder="write a comment..."
                                className="text-comment"
                                type="text"
                            />
                            <div onClick={addComment}><IoSend className="send-icon" /></div>

                        </InputCommentArea>
                    </CommentsArea>
                }
            </PostArea>

            {showDeleteModal &&
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
