import styled from "styled-components"

export const InputWrapper = styled.div`
    position: fixed;
    top: var(--header-height);
    display: flex;
    justify-content: center;
    width: 100%;
    height: 60px;
    background-color: var(--strong-black);

    @media (min-width: 475px) {
        display: none;
    }
`

export const StyledInput = styled.input`
    position: absolute;
    z-index: 3;
    width: 70%;
    height: 80%;
    background: #FFFFFF;
    border-radius: 8px;
    padding: 10px;
    font-size: 1.2rem;
    transition: 0.2s all;
    border: none;

    &:focus {
       outline: none;
    }

    &::placeholder{
        font-family: 'Lato';
        color: var(--placeholder-gray);
    }
`

export const UsersInSearch = styled.div`
    position: absolute;
    top: 0;
    z-index: 2;
    width: 70%;
    border-radius: 8px;
    padding: 10px;
    padding-top: ${props => props.usersSearchFiltered.length !== 0 && "60px"};
    background-color: var(--user-search-bg);
    transition: 0.3s all;

    img {
        width: 39px;
        height: 39px;
        border-radius: 18px;
    }

    ul {
        display: flex;
        align-items: center;
        gap: 10px;
        margin: 10px 0;
        font-family: 'Lato';
    }
`