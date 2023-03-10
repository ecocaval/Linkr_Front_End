import styled from "styled-components"

export const StyledSection = styled.section`
    max-width: 611px;
    width: 100%;
    height: 209px;
    background-color: var(--white);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    padding: 20px;
    display: flex;

    @media(max-width: 500px){
        border-radius: 0; 
        height: auto;
        padding: 10px 15px;
    }
`

export const StyledDivSecundary = styled.div`
    width: 100%;
    > h2 {
        font-size: 20px;
        line-height: 24px;
        color: #707070;
        margin-bottom: 15px;
    }

    > form {
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        > input, textarea {
            font-family: 'Lato';
            font-style: normal;
            font-weight: 300;
            font-style: normal;
            font-weight: 300;

            width: 100%;
            background: #EFEFEF;
            height: 30px;
            border-radius: 5px;
            border: none;
            outline: none;
            padding-left: 12px;
            padding-right: 10px;
        }

        > textarea {
            width: 100%;
            height: 66px;
            margin: 5px 0;
            resize: none;
            padding-top: 7px;
        }

        > button {
            width: 112px;
            height: 31px;
            background: #1877F2;
            border-radius: 5px;
            border: none;
            outline: none;
            color: #FFFFFF;
            font-weight: 700;
            font-size: 14px;
            line-height: 17px;
            :not([disabled]):active {
                background: #1264c9;
            }
            :disabled {
                background: #1264c9;
            }
        }
    }

    @media(max-width: 500px){
        > h2 {
            margin-bottom: 10px;
            text-align: center;
        }

        > form textarea {
            height: 47px;
        }

        > form button {
            height: 22px;
        }
    }

`

export const StyledDivPrimary = styled.div`
    margin-right: 18px;
    > img {
        max-width: 50px;
        max-height: 50px;
        outline: none;
        border-radius: 50%;
    }

    @media(max-width: 500px){
        display: none
    }
`