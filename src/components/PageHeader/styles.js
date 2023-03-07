import styled from "styled-components"

export const StyledHeader = styled.header`
    position: fixed;
    top: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 72px;
    background-color: var(--strong-black);
    padding: 20px;
`

export const StyledLogo = styled.h1`
    font-family: 'Passion One';
    font-size: 49px;
    color: #FFFFFF;
`

export const StyledInput = styled.input`
    width: 563px;
    height: 45px;
    background: #FFFFFF;
    border-radius: 8px;
    padding: 0 10px;
    margin: 0 20px;
    font-size: 19px;

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
