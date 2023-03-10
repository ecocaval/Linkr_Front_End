import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Header from "../../components/Header"
import Loader from "../../components/Loader"
import TrendingHashtags from "../../components/TrendingHashtags"
import UserPost from "../../components/UserPost"
import { PostsContext } from "../../contexts/PostsContext"
import { UserContext } from "../../contexts/UserContext"
import { NoPostText, PostsWrapper, Title, TrendingWrapper, UserArea } from "./styles"

export default function UserPage() {

    const { id } = useParams()
    const [myPosts, setMyPosts] = useState([])

    const { posts, gotPosts } = useContext(PostsContext)
    const { userSelected } = useContext(UserContext)

    useEffect(() => {
        const filteredPosts = posts.filter(post => {
            return post.userId === Number(id)
        })
        setMyPosts(filteredPosts)
    }, [id, posts])

    return (
        <>
            <Header />
            <UserArea>
                <PostsWrapper>
                    <div>
                        <img
                            src={userSelected.image}
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
                            (gotPosts ? <NoPostText>There are no posts yet</NoPostText> : <Loader/>)
                    }
                    <TrendingWrapper>
                        <TrendingHashtags />
                    </TrendingWrapper>
                </PostsWrapper>
            </UserArea>
        </>
    )
}