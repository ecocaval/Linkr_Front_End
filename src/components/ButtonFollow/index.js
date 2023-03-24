import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ButtonFollow() {
  const [clicked, setClicked] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
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
          console.log(data);
          if (data.is_following) {
            setClicked(false);
          }
        }
      } catch (error) {
        console.log("deu erro");
      }
    };
    statusButton();
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
          {},
          config
        );
        setClicked(!clicked);
      }
      
    } catch (error) {
      console.log(config)
      alert("Não foi possível executar a operação");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ButtonStyle
      onClick={handleClick}
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
