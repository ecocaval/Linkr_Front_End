import styled from "styled-components";

export const Wrapper = styled.div`
    width: calc(100% - 50px);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 50px;
    > p {
        font-family: 'Lato';
        font-size: 2rem;
        margin-top: 30px;
        color: #FFF;
    }
    @media (max-width: 315px) {
        width: 100%;
        margin-left: 20px;   
    }
`