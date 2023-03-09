import styled from "styled-components";

export const Container = styled.div`
  display: flex;
`

export const FormContainer = styled.div`
  width: 536px;
  height: 100vh;
  background-color: #333;
  padding-top: 274px;
  display: flex;
  flex-direction: column;
  align-items: center;
  form {
    display: flex;
    flex-direction: column;
    gap: 13px;
  }
  input {
    background-color: #FFF;
    width: 429px;
    height: 65px;
    border: none;
    border-radius: 6px;
    font-family: 'Oswald', sans-serif;
    font-size: 27px;
    font-weight: 700;
    padding-left: 17px;
    padding-bottom: 6px;
    outline: none;
    &::placeholder {
      color: #9F9F9F;
    }
  }
  button {
    width: 429px;
    height: 65px;
    background-color: #1877F2;
    border: none;
    border-radius: 6px;
    color: #FFF;
    font-family: 'Oswald', sans-serif;
    font-size: 25px;
    font-weight: 700;
    padding-bottom: 6px;
    cursor: pointer;
  }
  p {
    font-family: 'Lato', sans-serif;
    font-size: 20px;
    color: #FFF;
    margin-top: 22px;
    text-decoration: underline;
    cursor: pointer;
  }
`