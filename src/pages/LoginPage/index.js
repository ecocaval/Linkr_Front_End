import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Blocks } from 'react-loader-spinner';
import axios from 'axios';
import AuthLogo from '../../components/AuthLogo';
import { Container, FormContainer } from './styles';
import { LoginContext } from '../../contexts/LoginProvider';

export default function LoginPage() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isClicked, setIsClicked] = useState(false)
  
  const { sentLogin, setSentLogin } = useContext(LoginContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.length !== 0) {
      navigate('/timeline')
    }
  }, [navigate])

  async function login(e) {
    e.preventDefault()
    setSentLogin(true)

    const URL = `${process.env.REACT_APP_API_URL}/signin`
    const body = { email, password }
    setIsClicked(true)

    if (email === '' || password === '') {
      setIsClicked(false)
      return alert('Preencha todos os campos')
    }

    try {
      const data = await axios.post(URL, body)
      if (data) {
        localStorage.setItem('token', data.data.token)
        localStorage.setItem('userId', data.data.userId)
        navigate('/timeline')
        setIsClicked(false)
      }
    } catch (err) {
      alert(err.response.data)
      setIsClicked(false)
    }
    setSentLogin(false)
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
          <button type="submit" disabled={isClicked} data-test="login-btn">
            {sentLogin ? <Blocks
              visible={true}
              height="40"
              width="40"
              ariaLabel="blocks-loading"
              wrapperClass="blocks-wrapper"
              style={{ overflow: 'hidden' }}
            /> : "Log In"}
          </button>
        </form>
        <p data-test="sign-up-link" onClick={() => navigate('/sign-up')}>First time? Create an account!</p>
      </FormContainer>
    </Container>
  );
}
