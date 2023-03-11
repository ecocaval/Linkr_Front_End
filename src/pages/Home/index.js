import { useContext } from "react"
import Header from "../../components/Header"
import Loader from "../../components/Loader"
import PagePublishPost from "../../components/PublishPost/PagePublishPost"
import TrendingHashtags from "../../components/TrendingHashtags"
import UserPost from "../../components/UserPost"
import { MobileSearchContext } from "../../contexts/MobileSearchContext"
import { PostsContext } from "../../contexts/PostsContext"
import { NoPostText } from "../UserPage/styles"
import { HomeArea, PostsWrapper, Title } from "./styles"

export default function Home() {

    const { posts, gotPosts } = useContext(PostsContext)
    const { showMobileSearchInput } = useContext(MobileSearchContext)

    return (
        <>
            <Header />
            <HomeArea showMobileSearchInput={showMobileSearchInput}>
                <PostsWrapper>
                    <Title>timeline</Title>
                    <PagePublishPost />
                    {
                        posts[0] ?
                            posts.map((post, index) => <UserPost key={index} post={post} />) :
                            (gotPosts ? <NoPostText data-test="message">There are no posts yet</NoPostText> : <Loader />)
                    }
                    <TrendingHashtags />
                </PostsWrapper>
            </HomeArea>
        </>
    )
}