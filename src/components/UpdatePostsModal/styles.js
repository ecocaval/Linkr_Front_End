import styled from "styled-components";
import { fadeIn } from "../../styles/animations/fadeInOut";

export const StyledModal = styled.button`
    width: 100%;
    border: none;
    height: 60px;
    background: #1877F2;
    margin-top: 30px;
    margin-bottom: 25px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    transition: 0.2s all ease-out;
    animation: ${fadeIn} 0.3s ease-out forwards;

    &:hover {
        background: var(--strong-blue);
        cursor: pointer;
    }

    > p {
        font-family: 'Lato';
        text-align: center;
        font-size: 16px;
        color: #FFFFFF;
    }
`