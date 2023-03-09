import { StyledSection, StyledDivPrimary, StyledDivSecundary } from "./styles"
import axios from "axios"
import { useState } from "react"

export default function PagePublishPost({id, image}){
    const [send, setSend] = useState(false)
    const [form, setForm] = useState({
        link: "",
        description: ""
    })

    function handleForm(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    async function autenticar(e) {
        e.preventDefault()
        setSend(true)
        const dados = {id, ...form}
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/posts/new`, dados)
            setForm({
                link: "",
                description: ""
            })
        } catch (error) {
            alert("There was an error publishing your link")
            console.log(error)
        }
        setSend(false)
    }

    return (
        <StyledSection>
            <StyledDivPrimary>
                <img src={image} alt="imagem perfil"></img>
            </StyledDivPrimary>
            <StyledDivSecundary>
                <h2>What are you going to share today?</h2>
                <form onSubmit={autenticar}> 
                    <input 
                        type="url" 
                        placeholder="http://..."
                        required
                        name="link"
                        onChange={handleForm}
                        value={form.value}
                        disabled={send}
                    >   
                    </input>
                    <textarea 
                        placeholder="Awesome article about #javascript"
                        name="description"
                        onChange={handleForm}
                        value={form.value}
                        disabled={send}
                    ></textarea>
                    <button 
                    type="submit"
                    disabled={send}
                    >
                        {send ? "Publishing..." : "Publish"}
                    </button>
                </form>
            </StyledDivSecundary>
        </StyledSection>
    )
}

// { headers: { Authorization: `Bearer ${token}` } }