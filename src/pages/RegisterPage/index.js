import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLogo from "../../components/AuthLogo";
import { Container, FormContainer } from "./style";

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [isClicked, setIsClicked] = useState(false)
  const navigate = useNavigate()

  async function register(e) {
    e.preventDefault()

    const URL = `http://localhost:5000/signup`
    const body = {email, password, name, image}
    setIsClicked(true)

    try {
      await axios.post(URL, body)
      navigate('/signin')
      setIsClicked(false)
    } catch (err) {
      alert(err.response.data)
      setIsClicked(false)
    }
  }

  return(
    <Container>
      <AuthLogo />
      <FormContainer>
				<form onSubmit={register}>
					<input placeholder="e-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isClicked}/>
          <input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={isClicked}/>
          <input placeholder="username" type="text" value={name} onChange={(e) => setName(e.target.value)} required disabled={isClicked}/>
          <input placeholder="picure url" type="url" value={image} onChange={(e) => setImage(e.target.value)} required disabled={isClicked}/>
          <button type="submit" disabled={isClicked}>Sign Up</button>
				</form>
        <p onClick={() => navigate('/signin')}>Switch back to log in</p>
			</FormContainer>
    </Container>
  )
}