import styled from "styled-components"
import { fadeUp, reverseFadeUp } from "../../styles/animations/fadeUp"
import { reverseSpin180, spin180 } from "../../styles/animations/spin180"

export const HeaderCSSvariables = styled.div`
    --header-height: 72px;
    --user-search-bg: #E7E7E7;
`

export const StyledHeader = styled.header`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: var(--header-height);
    background-color: var(--strong-black);
    padding: 20px;
    z-index: 2;
`

export const StyledLogo = styled.h1`
    font-family: 'Passion One';
    font-size: 3rem;
    color: #FFFFFF;
`

export const StyledUserAside = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    > img {
        width: 55px;
        height: 50px;
        border-radius: 25px;
    }
`

export const ArrowController = styled.div`
    animation: ${props => props.arrowWasClicked ? spin180 : (props.arrowWasFirstClicked ? reverseSpin180 : "")} 0.2s ease-out forwards;

    &:hover {
        cursor: pointer;
    }
`

export const LogoutModal = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    right: 0;
    padding: 0 0 10px 20px ;
    width: 150px;
    height: 40px;
    background-color: var(--regular-black);
    border-radius: 0 0 0 10px;
    top: 0;
    opacity: 0;
    z-index: 0;
    animation: ${props => props.arrowWasClicked ? fadeUp : (props.arrowWasFirstClicked ? reverseFadeUp : "")} 0.2s ease-out forwards;

    > p {
        color: #FFFFFF;
        font-family: 'Lato';

        &:hover {
            cursor: pointer;
        }
    }
`

export const MobileSearcher = styled.div`
    display: none;

    @media (max-width: 475px) {
        display: block;
    }
`