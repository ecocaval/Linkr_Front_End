import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ButtonFollow from "../../components/ButtonFollow"
import Header from "../../components/Header"
import Loader from "../../components/Loader"
import TrendingHashtags from "../../components/TrendingHashtags"
import UserPost from "../../components/UserPost"
import { MobileSearchContext } from "../../contexts/MobileProvider"
import { PostsContext } from "../../contexts/PostsProvider"
import { UserContext } from "../../contexts/UserProvider"
import handlePosts from "../../utils/handlePosts"
import { NoPostText, PostsWrapper, Title, TrendingWrapper, UserArea } from "./styles"
import getMyPosts from "./utils/getMyPosts"
import getPageUser from "./utils/getPageUser"

export default function UserPage() {
    const { id } = useParams()
    const { myUser } = useContext(UserContext)
    const { posts, setPosts } = useContext(PostsContext)
    const { userSelected, setUserSelected } = useContext(UserContext)
    const { showMobileSearchInput } = useContext(MobileSearchContext)
    const [myPosts, setMyPosts] = useState([])
    const [gotPosts, setGotPosts] = useState(false)

    useEffect(() => {
        if (!userSelected) {
            getPageUser(setUserSelected, id)
        }

        if (posts) {
            const filteredPosts = posts.filter(post => {
                return post.userId === Number(id)
            })
            setMyPosts(filteredPosts)
            return
        } else {
            getMyPosts(setMyPosts, setGotPosts)
        }
        // eslint-disable-next-line
    }, [id, posts, userSelected])

    useEffect(() => {
        handlePosts(setPosts,setGotPosts)
        // eslint-disable-next-line
    }, [])

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
                        myPosts[0] ? myPosts.map((post, index) => <UserPost key={index} post={post} />) :
                            (gotPosts ? <NoPostText data-test="message">There are no posts yet</NoPostText> : <Loader />)
                    }
                    <TrendingWrapper>
                        <TrendingHashtags />
                    </TrendingWrapper>
                    {myUser.id !== Number(id) && <ButtonFollow/>}
                </PostsWrapper>
            </UserArea>
        </>
    )
}