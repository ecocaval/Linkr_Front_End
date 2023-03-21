import { useContext, useEffect } from "react"
import Header from "../../components/Header"
import Loader from "../../components/Loader"
import PagePublishPost from "../../components/PublishPost/PagePublishPost"
import TrendingHashtags from "../../components/TrendingHashtags"
import UserPost from "../../components/UserPost"
import { LoginContext } from "../../contexts/LoginProvider"
import { MobileSearchContext } from "../../contexts/MobileProvider"
import { PostsContext } from "../../contexts/PostsProvider"
import { UserContext } from "../../contexts/UserProvider"
import getPosts from "../../utils/getPosts"
import getUsers from "../../utils/getUsers"
import { NoPostText } from "../UserPage/styles"
import { HomeArea, PostsWrapper, Title } from "./styles"

export default function Home() {

    const {
        posts,
        setPosts,
        gotPosts,
        setGotPosts,
        mustUpdatePosts,
        setMustUpdatePosts,
        setSendPost
    } = useContext(PostsContext)

    const { showMobileSearchInput } = useContext(MobileSearchContext)
    const { setMyUser, setReturnToSignUp } = useContext(UserContext)
    const { sentLogin, setSentLogin } = useContext(LoginContext)

    async function handleMyUser() {
        await getUsers(setMyUser, 'my_user', setReturnToSignUp)
    }

    async function handlePosts() {
        setGotPosts(await getPosts(setPosts))
    }

    useEffect(() => {
        handleMyUser()
        handlePosts()
        // eslint-disable-next-line
    }, [sentLogin, setSentLogin])

    useEffect(() => {
        if (mustUpdatePosts) {
            getPosts(setPosts, setSendPost)
            setMustUpdatePosts(false)
        }
        // eslint-disable-next-line
    }, [mustUpdatePosts])

    return (
        <>
            <Header />
            <HomeArea showMobileSearchInput={showMobileSearchInput}>
                <PostsWrapper>
                    <Title>timeline</Title>
                    <PagePublishPost />
                    {
                        posts[0] ?
                            posts.map((post, index) => (
                                <UserPost key={index} post={post} />
                            )) :
                            (gotPosts ?
                                <NoPostText data-test="message">There are no posts yet</NoPostText> :
                                <Loader />
                            )
                    }
                    <TrendingHashtags />
                </PostsWrapper>
            </HomeArea>
        </>
    )
}