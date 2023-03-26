import styled from "styled-components";

export const HomeArea = styled.div`
    margin: 0 auto;
    height: calc(100vh - 72px);
    overflow-y: auto;
    padding-right: 25vw;
    padding-top: 20px;
    transition: 0.4s all;

    @media (max-width:1080px) {
        padding-right: 0;
    }

    @media (max-width: 475px) {
        height: ${props => props.showMobileSearchInput ? "calc(100vh - 152px)" : "calc(100vh - 72px)" };
    }
    
    @media only page and (hover: none) and (pointer: coarse) and (max-width:475px){
        ::-webkit-scrollbar {
            width: 0;
        }
        ::-webkit-scrollbar-thumb {
            width: 0;
        }
    }
`

export const Title = styled.p`
    font-family: 'Oswald';
    font-weight: 700;
    font-size: 3rem;
    color: #FFFFFF;
    margin: 40px 0;

    @media (max-width: 550px) {
        margin: 40px 20px;
        margin-top: 10px;
    }
`

export const PostsWrapper = styled.div`
    max-width: 550px;
    margin: auto;
    padding-bottom: 20px;
`
