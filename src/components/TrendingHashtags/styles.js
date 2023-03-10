import styled from "styled-components";

export const Wrapper = styled.div`
    transition: 0.4s all ease-out;
    position: fixed;
    top: 25%;
    left: calc(50vw + 160px);
    padding: 20px;
    width: 300px;
    min-height: 400px;
    background: var(--regular-black);
    border-radius: 16px;

    @media (max-width:1080px) {
        display: none;
    }

    p:first-child {
        font-weight: 700;
        font-size: 2rem;
    }

    p {
        color: #FFF;
        font-family: 'Oswald';
        font-size: 1.2rem;
        padding: 10px 0;
    }

    .division-line {
        width: auto;
        height: 2px;
        margin: 10px 0;
        background-color: var(--light-black);
    }
`