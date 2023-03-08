import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLogo from '../../components/AuthLogo';
import { Container, FormContainer } from './style';
import axios from 'axios';

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function login(e) {
    e.preventDefault()

    const URL = `http://localhost:5000/signin`
    const body = {email, password}

    try {
      const data = await axios.post(URL, body)
      localStorage.setItem('token', data.data.token)
    } catch (err) {
      alert(err.response.data)
    }
  }

	return (
		<Container>
			<AuthLogo />
			<FormContainer>
				<form onSubmit={login}>
					<input placeholder="e-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Log In</button>
				</form>
        <p>First time? Create an account!</p>
			</FormContainer>
		</Container>
	);
}
