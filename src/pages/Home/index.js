import { useContext } from "react"
import Header from "../../components/Header"
import Loader from "../../components/Loader"
import PagePublishPost from "../../components/PublishPost/PagePublishPost"
import UserPost from "../../components/UserPost"
import { PostsContext } from "../../contexts/PostsContext"
import { HomeArea, PostsWrapper } from "./styles"

export default function Home() {

    const { posts } = useContext(PostsContext)

    return (
        <>
            <Header />
            <HomeArea>
                <PostsWrapper>
                    <PagePublishPost />
                    {
                        posts[0] ?
                            posts.map((post, index) => <UserPost key={index} post={post} />) :
                            <Loader />
                    }
                </PostsWrapper>
            </HomeArea>
        </>
    )
}