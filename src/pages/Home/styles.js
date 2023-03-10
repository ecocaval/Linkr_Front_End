import styled from "styled-components";

export const HomeArea = styled.div`
    margin: 0 auto;
    padding-top: 20px;
    height: calc(100vh - 72px);
    overflow-y: auto;

    scrollbar-width: thin;
    scrollbar-color: #000000;
    /* Works on Chrome, Edge, and Safari */
    ::-webkit-scrollbar {
        width: 12px;
    }

    ::-webkit-scrollbar-track {
        background: transparent;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #000;
        width: 15px;
        border-radius: 20px;
    }
    
    @media only screen and (hover: none) and (pointer: coarse) and (max-width:475px){
        ::-webkit-scrollbar {
            width: 0;
        }
        ::-webkit-scrollbar-thumb {
            width: 0;
        }
    }
`

export const PostsWrapper = styled.div`
    max-width: 550px;
    margin: auto;
`