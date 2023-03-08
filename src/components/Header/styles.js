import styled from "styled-components"

export const CSSvariables = styled.div`
    --header-height: 72px;
`

export const StyledHeader = styled.header`
    position: fixed;
    top: 0;
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
    font-size: 49px;
    color: #FFFFFF;
`

export const InputWrapper = styled.div`
    position: relative;
    width: 563px;
    height: 45px;
    margin: 0 20px;

    > i {
        position: absolute;
        top: 15px;
        right: 20px;

        @media (max-width: 475px) {
            display: none;
        }
    }
`

export const StyledInput = styled.input`
    width: 100%;
    height: 100%;
    background: #FFFFFF;
    border-radius: 8px;
    padding: 0 10px;
    font-size: 19px;
    transition: 0.2s all;

    &:focus {
       outline: none;
    }

    &::placeholder{
        font-family: 'Lato';
        color: var(--placeholder-gray);
    }

    @media (max-width: 475px) {
        display: none;
    }
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
    animation: ${props => props.arrowWasClicked ? "spin-180" : "reverse-spin-180"} 0.2s ease-out forwards;

    &:hover {
        cursor: pointer;
    }

    @keyframes spin-180 {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(180deg);
        }
    }

    @keyframes reverse-spin-180 {
        from {
            transform: rotate(180deg);
        }
        to {
            transform: rotate(360deg);
        }
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
    animation: ${props => props.arrowWasClicked ? "fade-up" : "reverse-fade-up"} 0.2s ease-out forwards;

    > p {
        color: #FFFFFF;
        font-family: 'Lato';

        &:hover {
            cursor: pointer;
        }
    }

    @keyframes fade-up {
        0% {
            top: 0;
            opacity: 0;
        }
        100% {
            top: var(--header-height);
            opacity: 1;
        }
    }

    @keyframes reverse-fade-up {
        0% {
            top: var(--header-height);
            opacity: 1;
        }
        100% {
            top: 0;
            opacity: 0;
        }
    }
`
