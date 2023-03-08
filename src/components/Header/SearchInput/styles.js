import styled from "styled-components"

export const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    width: 550px;
    height: 45px;
    margin: 0 20px;

    > i {
        position: absolute;
        top: 15px;
        right: 20px;
        z-index: 3;
    }

    @media (max-width: 475px) {
        display: none;
    }
`

export const StyledInput = styled.input`
    position: absolute;
    z-index: 3;
    width: 100%;
    height: 45px;
    background: #FFFFFF;
    border-radius: 8px;
    padding: 0 10px;
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
    width: 100%;
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