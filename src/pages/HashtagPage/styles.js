import styled from "styled-components";

export const HashtagsArea = styled.div`
    margin: 0 auto;
    height: calc(100vh - 72px);
    overflow-y: auto;
    padding-top: 20px;
    padding-right: 25vw;  
    transition: 0.4s all;  

    @media (max-width:1080px) {
        padding-right: 0;
        padding: 45px 20px;
    }

    @media (max-width:550px) {
        padding-top: 25px;
    }

    @media (max-width: 475px) {
        height: ${props => props.showMobileSearchInput ? "calc(100vh - 152px)" : "calc(100vh - 72px)" };
    }
`

export const PostsWrapper = styled.div`
    max-width: 550px;
    margin: auto;
    padding-bottom: 20px;
`

export const Title = styled.p`
    font-family: 'Oswald';
    font-weight: 700;
    font-size: 3rem;
    color: #FFFFFF;
    margin: 40px 0;

    @media (max-width: 550px) {
        margin: 0;
        font-size: 2rem;
    }
`

export const NoPostText = styled.p`
    font-family: 'Oswald';
    text-align: center;
    font-size: 2rem;
    text-align: start;
    margin-top: 30px;
    color: #FFFFFF;

    @media (max-width: 550px) {
        margin: 0;
    }

`

export const TrendingWrapper = styled.div`
    @media (max-width:1080px) {
        display: none;
    }

`
