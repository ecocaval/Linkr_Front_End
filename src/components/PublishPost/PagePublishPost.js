import { StyledSection, StyledDivPrimary, StyledDivSecundary } from "./styles"
import axios from "axios"
import { useContext, useState } from "react"
import { MyUserContext } from "../../contexts/MyUserContext.js"
import { PostsContext } from "../../contexts/PostsContext"

export default function PagePublishPost() {
    const { myUser } = useContext(MyUserContext)
    const { setMustUpdatePosts, sendPost, setSendPost } = useContext(PostsContext)
    const token = localStorage.getItem('token')
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
        setSendPost(true)
        const dados = { ...form }
        const config = { headers: { Authorization: `Bearer ${token}` } }
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/posts/new`, dados, config)
            setForm({
                link: "",
                description: ""
            })
        } catch (error) {
            alert("There was an error publishing your link")
            console.log(error)
        }
        setMustUpdatePosts(true)
    }

    return (
        <StyledSection>
            <StyledDivPrimary>
                <img src={myUser.image} alt="imagem perfil"></img>
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
                        disabled={sendPost}
                    >
                    </input>
                    <textarea
                        placeholder="Write something..."
                        name="description"
                        onChange={handleForm}
                        value={form.value}
                        disabled={sendPost}
                    ></textarea>
                    <button
                        type="submit"
                        disabled={sendPost}
                    >
                        {sendPost ? "Publishing..." : "Publish"}
                    </button>
                </form>
            </StyledDivSecundary>
        </StyledSection>
    )
}