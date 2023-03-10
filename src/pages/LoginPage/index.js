import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLogo from '../../components/AuthLogo';
import { Container, FormContainer } from './styles';
import axios from 'axios';

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isClicked, setIsClicked] = useState(false)
  const navigate = useNavigate()

  async function login(e) {
    e.preventDefault()

    const URL = `${process.env.REACT_APP_API_URL}/signin`
    const body = { email, password }
    setIsClicked(true)

    try {
      const data = await axios.post(URL, body)
      localStorage.setItem('token', data.data.token)
      localStorage.setItem('userId', data.data.userId)
      navigate('/timeline')
      setIsClicked(false)
    } catch (err) {
      alert(err.response.data)
      setIsClicked(false)
    }
  }

  return (
    <Container>
      <AuthLogo />
      <FormContainer>
        <form onSubmit={login}>
          <input
            placeholder="e-mail"
            data-test="email"
            type="email"
            value={email}
            autoComplete="current-email"
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isClicked}
          />
          <input
            placeholder="password"
            data-test="password"
            type="password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isClicked}
          />
          <button type="submit" disabled={isClicked} data-test="login-btn">Log In</button>
        </form>
        <p data-test="sign-up-link" onClick={() => navigate('/signup')}>First time? Create an account!</p>
      </FormContainer>
    </Container>
  );
}
