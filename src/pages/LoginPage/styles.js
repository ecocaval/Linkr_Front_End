import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  @media (max-width: 725px) {
    display: flex;
    flex-direction: column;
  }
`

export const FormContainer = styled.div`
  width: 50%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  @media (max-width: 725px) {
    padding-top: 40px;
    margin: auto;
    height: auto;
  }
  @media (max-width: 900px) {
    width: 70%;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 13px;
  }
  input {
    background-color: #FFF;
    width: 430px;
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
    width: 430px;
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
  @media (max-width: 475px) {
    width: 100%;
    height: 100%;
    padding-top: 40px;
    input {
      width: 100%;
      height: 56px;
    }
    button {
      width: 100%;
      height: 56px;
    }
    p {
      font-size: 17px;
    }
  }
`