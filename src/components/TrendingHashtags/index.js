import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wrapper } from "./styles";
import getHashtags from "./utils/getHashtags";

export default function TrendingHashtags() {

    const navigate = useNavigate()

    const [hashtags, setHashtags] = useState([])

    useEffect(() => {
        getHashtags(setHashtags)
    }, [])

    return (
        <Wrapper>
            <p>trending</p>
            <div className="division-line"></div>
            {hashtags.map((hashtag, index) => (
                <p
                    key={index}
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