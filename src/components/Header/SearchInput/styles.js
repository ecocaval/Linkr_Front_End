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

export const StyledInput = styled.div`
    position: absolute;
    z-index: 3;
    width: 100%;
    
    > input {
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
    }
`

export const UsersInSearch = styled.div`
    position: absolute;
    top: 0;
    z-index: 2;
    width: 100%;
    border-radius: 8px;
    padding-top: ${props => props.usersSearchFiltered.length !== 0 && "45px"};
    background-color: var(--user-search-bg);
    transition: 0.3s all;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);

    img {
        width: 39px;
        height: 39px;
        border-radius: 18px;
        opacity: 1;
        transition: 0.3s all;
    }

    ul {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        margin: 10px 0;
        font-family: 'Lato';
        padding: 10px;
        transition: 0.2s all;

        > div {
            width: 100%;
            display: flex;
            align-items: center;
            gap: 15px;
        }

        p {
            transition: 0.3s all;
        }
        
        .division-line {
            width: 100%;
            height: 1px;
            background-color: var(--light-gray);
            transition: 0.3s all;
        }

        &:hover {
            cursor: pointer;
            background-color: var(--strong-black);

            img {
                opacity: 0.8;
                transform: translateY(7px);
            }

            p {
                color: #FFF;
                padding-left: 5px;
                transform: translateY(7px);
            }

            .division-line {
                width: 78%;
                background-color: #FFF;
                transform: translateY(-5px);
            }
        }
    }
`