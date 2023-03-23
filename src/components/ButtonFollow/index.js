import { useEffect, useState } from "react";
import styled from "styled-components";

export default function ButtonFollow({ id }) {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {

  }, [])

  function handleClick() {
    setClicked(!clicked);
  }

  return (
    <ButtonStyle onClick={handleClick} color={!clicked}>
      {clicked ? "Follow" : "Unfollow"}
    </ButtonStyle>
  );
}

const ButtonStyle = styled.button`
  width: 112px;
  height: 31px;
  background: ${(props) => (props.color ? "#fff" : "#1877f2")};
  border-radius: 5px;
  border: none;
  outline: none;
  font-family: "Lato";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: ${(props) => (props.color ? "#1877f2" : "#fff")};

  position: absolute;
  top: 15px;
  right: 0;
`;
