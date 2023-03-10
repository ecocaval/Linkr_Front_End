import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLogo from "../../components/AuthLogo";
import { Container, FormContainer } from "../LoginPage/styles";

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [isClicked, setIsClicked] = useState(false)
  const navigate = useNavigate()

  async function register(e) {
    e.preventDefault()
    if(!email || !password || !name || !image) return alert("Informe todos os campos!")

    const URL = `${process.env.REACT_APP_API_URL}/signup`
    const body = { email, password, name, image }
    setIsClicked(true)

    try {
      await axios.post(URL, body)
      navigate('/')
    } catch (err) {
      alert(err.response.data)
    } finally {
      setIsClicked(false)
    }
  }

  return (
    <Container>
      <AuthLogo />
      <FormContainer>
        <form onSubmit={register}>
          <input
            placeholder="e-mail"
            data-test="email"
            type="email"
            value={email}
            autoComplete="current-email"
            onChange={(e) => setEmail(e.target.value)}
            disabled={isClicked}
          />
          <input
            placeholder="password"
            data-test="password"
            type="password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            disabled={isClicked}
          />
          <input
            placeholder="username"
            data-test="username"
            type="text"
            value={name}
            autoComplete="on"
            onChange={(e) => setName(e.target.value)}
            disabled={isClicked}
          />
          <input
            placeholder="picure url"
            data-test="picture-url"
            type="url"
            value={image}
            autoComplete="on"
            onChange={(e) => setImage(e.target.value)}
            disabled={isClicked}
          />
          <button type="submit" disabled={isClicked} data-test="sign-up-btn">Sign Up</button>
        </form>
        <p data-test="login-link" onClick={() => navigate('/')}>Switch back to log in</p>
      </FormContainer>
    </Container>
  )
}
