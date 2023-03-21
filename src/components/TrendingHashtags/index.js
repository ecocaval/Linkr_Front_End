import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostsContext } from "../../contexts/PostsProvider";
import { Wrapper } from "./styles";
import getHashtags from "./utils/getHashtags";

export default function TrendingHashtags() {

    const navigate = useNavigate()

    const { posts } = useContext(PostsContext)

    const [hashtags, setHashtags] = useState([])

    useEffect(() => {
        getHashtags(setHashtags)
    }, [posts])

    return (
        <Wrapper data-test="trending" >
            <p>trending</p>
            <div className="division-line"></div>
            {hashtags.map((hashtag, index) => (
                <p
                    key={index}
                    data-test="hashtag"
                    onClick={() => {
                        navigate(`/hashtag/${hashtag.name}`)
                    }}
                >
                    {`#${hashtag.name}`}
                </p>
            ))}
        </Wrapper>
    )
}