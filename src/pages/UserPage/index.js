import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Header from "../../components/Header"
import Loader from "../../components/Loader"
import TrendingHashtags from "../../components/TrendingHashtags"
import UserPost from "../../components/UserPost"
import { PostsContext } from "../../contexts/PostsContext"
import { UserContext } from "../../contexts/UserContext"
import { NoPostText, PostsWrapper, Title, TrendingWrapper, UserArea } from "./styles"
import getMyPosts from "./utils/getMyPosts"

export default function UserPage() {

    const { id } = useParams()
    
    const { posts } = useContext(PostsContext)
    const { userSelected } = useContext(UserContext)
    
    const [myPosts, setMyPosts] = useState([])
    const [gotPosts, setGotPosts] = useState(false)

    useEffect(() => {
        if(posts) {
            const filteredPosts = posts.filter(post => {
                return post.userId === Number(id)
            })
            setMyPosts(filteredPosts)
            return
        } else {
            getMyPosts(setMyPosts, setGotPosts)
        }
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
                            (gotPosts ? <NoPostText data-test="message">There are no posts yet</NoPostText> : <Loader />)
                    }
                    <TrendingWrapper>
                        <TrendingHashtags />
                    </TrendingWrapper>
                </PostsWrapper>
            </UserArea>
        </>
    )
}