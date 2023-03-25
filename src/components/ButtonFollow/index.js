import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../contexts/UserProvider";

export default function ButtonFollow() {
  const { id } = useParams();

  const [clicked, setClicked] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { setMustUpdateUsers } = useContext(UserContext)

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const statusButton = async () => {
      try {
        if (token && id) {
          const { data } = await axios.post(
            `${process.env.REACT_APP_API_URL}/users/${id}/follow?status=true`,
            {},
            config
          );
          if (data.is_following) {
            setClicked(false);
          }
        }
      } catch (error) {
      }
    };
    statusButton();
    // eslint-disable-next-line
  }, [id]);

  async function handleClick() {
    setIsLoading(true);
    try {
      if (clicked) {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/users/${id}/follow`,
          {},
          config
        );
        setClicked(!clicked);
      } else {
        await axios.delete(
          `${process.env.REACT_APP_API_URL}/users/${id}/unfollow`,
          config
        );
        setClicked(!clicked);
      }

    } catch (error) {
      alert("Não foi possível executar a operação");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ButtonStyle
      onClick={() => {
        setMustUpdateUsers(true)
        handleClick()
      }}
      disabled={isLoading}
      colorButton={!clicked}
    >
      {clicked ? "Follow" : "Unfollow"}
    </ButtonStyle>
  );
}

const ButtonStyle = styled.button`
  width: 112px;
  height: 31px;
  background: ${(props) => (props.colorButton ? "#fff" : "#1877f2")};
  border-radius: 5px;
  border: none;
  outline: none;
  font-family: "Lato";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: ${(props) => (props.colorButton ? "#1877f2" : "#fff")};

  position: absolute;
  top: 15px;
  right: 0;
`;
