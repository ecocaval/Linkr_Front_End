import styled from "styled-components";

export const UserArea = styled.div`
    margin: 0 auto;
    height: calc(100vh - 72px);
    overflow-y: auto;
    padding-top: 50px;
    padding-right: 25vw;  
    transition: 0.4s all;  

    @media (max-width:1080px) {
        padding-right: 0;
        padding: 45px 20px;
    }

    @media (max-width:550px) {
        padding-top: 25px;
    }
`

export const PostsWrapper = styled.div`
    max-width: 550px;
    margin: auto;
    
    > div {
        display: flex;
        align-items: center;
        height: auto;
        gap: 20px;
        padding-bottom: 20px;
    }

    > div:first-child {
        height: 70px;
    }

    > div:last-child {
        display: block;
    }
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
