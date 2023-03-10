import { Avatar, Header, Icons, Infos, Left, LinkArea, PostArea, Right } from "./styles"
import { IoHeartOutline, IoTrashSharp, IoPencilSharp } from "react-icons/io5";
import { useContext, useState } from "react";
import Modal from "../Modal";
import deletePost from "./utils/deletePost";
import { PostsContext } from "../../contexts/PostsContext";
import { Blocks } from 'react-loader-spinner'

export default function UserPost({ post }) {

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [postBeingDeleted, setPostBeingDeleted] = useState(false)
    const { setPosts } = useContext(PostsContext)

    return (
        <>
            <PostArea>
                <Left>
                    <Avatar src={post.userImage} />
                    <IoHeartOutline className="heart-outline-icon" />
                    <div className="likes-count">{post.likesCount} likes</div>
                </Left>
                <Right>
                    <Infos>
                        <Header>
                            <div className="user-name">{post.userName}</div>
                            <Icons>
                                <IoPencilSharp className="icon" />
                                {
                                    post.userCanDelete &&
                                    <IoTrashSharp className="icon" onClick={() => { setShowDeleteModal(!showDeleteModal) }} />
                                }
                            </Icons>
                        </Header>
                        <div className="description">{post.postDesc}</div>
                        <LinkArea>
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
                            style={{overflow:'hidden'}}
                        >
                            {postBeingDeleted ?
                                <Blocks
                                    visible={true}
                                    height="40"
                                    width="40"
                                    ariaLabel="blocks-loading"
                                    wrapperClass="blocks-wrapper"
                                    style={{overflow:'hidden'}}
                                />
                                : "Yes, delete it"}
                        </button>
                    </div>
                </Modal>
            }
        </>
    )
}