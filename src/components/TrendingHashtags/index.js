import { useEffect, useState } from "react";
import { Wrapper } from "./styles";
import getHashtags from "./utils/getHashtags";

export default function TrendingHashtags() {

    const [hashtags, setHashtags] = useState([])

    useEffect(() => {
        getHashtags(setHashtags)
    }, [])

    return (
        <Wrapper>
            <p>trending</p>
            <div className="division-line"></div>
            {hashtags.map((hashtag, index) => <p key={index}>{`#${hashtag.name}`}</p>)}
        </Wrapper>
    )
}