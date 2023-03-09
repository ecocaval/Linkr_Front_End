import styled from "styled-components";

export const AuthLogoContainer = styled.div`
  width: 905px;
  height: 100vh;
  background-color: #151515;
  color: #FFF;
  padding-top: 301px;
  padding-left: 144px;
  h1 {
    font-family: 'Passion One', cursive;
    font-size: 106px;
    font-weight: 700;
  }
  h2 {
    font-family: 'Oswald', sans-serif;
    font-size: 43px;
    font-weight: 700;
  }
  @media (max-width: 475px) {
    width: 100%;
    height: 30%;
    display: flex;
    flex-direction: column;
    text-align: center;
    padding-left: 0;
    padding-top: 0;
    padding-bottom: 17px;
    h1 {
      font-size: 76px;
      margin-top: 10px;
    }
    h2 {
      font-size: 23px;
      margin-bottom: 10px;
    }
  }
`