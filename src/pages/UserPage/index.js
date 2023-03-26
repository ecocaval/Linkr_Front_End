import { useContext, useEffect } from "react"
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

export default function UserPage() {
    const { id } = useParams()

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
                                userPosts.map((post, index) => <UserPost key={uuidv4()} post={post} postIndex={index} page={'users'} />) :
                                <NoPostText data-test="message">There are no posts yet</NoPostText>) :
                            <Loader />
                    }
                    <TrendingWrapper>
                        <TrendingHashtags />
                    </TrendingWrapper>
                    {myUser.id !== Number(id) && <ButtonFollow />}
                </PostsWrapper>
            </UserArea>
        </>
    )
}