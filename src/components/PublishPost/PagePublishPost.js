import { StyledSection, StyledDivPrimary, StyledDivSecundary } from "./styles"
import axios from "axios"
import { useContext, useState } from "react"
import { UserContext } from "../../contexts/UserProvider.js"
import { PostsContext } from "../../contexts/PostsProvider"
import { useEffect } from "react"

export default function PagePublishPost() {
    const { myUser } = useContext(UserContext)
    const { setMustUpdatePosts, sendPost, setSendPost } = useContext(PostsContext)

    const token = localStorage.getItem('token')

    const [errorDuringSent, setErrorDuringSent] = useState(false) 
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

    async function authenticate(e) {
        e.preventDefault()
        setSendPost(true)
        const data = { ...form }
        const config = { headers: { Authorization: `Bearer ${token}` } }
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/posts/new`, data, config)
            if (response) {
                setMustUpdatePosts(true)
            }
        } catch (error) {
            alert("There was an error publishing your link")
            setSendPost(false)
            setErrorDuringSent(true)
            console.log(error)
        }
    }

    useEffect(() => {
        if (!sendPost && !errorDuringSent) {
            setForm({
                link: "",
                description: ""
            })
        }
        if(errorDuringSent) {
            setErrorDuringSent(false)
        }
    }, [sendPost])

    return (
        <StyledSection data-test="publish-box">
            <StyledDivPrimary>
                <img src={myUser.image} alt="imagem perfil"></img>
            </StyledDivPrimary>
            <StyledDivSecundary>
                <h2>What are you going to share today?</h2>
                <form onSubmit={authenticate}>
                    <input
                        type="url"
                        placeholder="http://..."
                        required
                        name="link"
                        onChange={handleForm}
                        value={form.link}
                        disabled={sendPost}
                        data-test="link"
                    >
                    </input>
                    <textarea
                        placeholder="Write something..."
                        name="description"
                        onChange={handleForm}
                        value={form.description}
                        disabled={sendPost}
                        data-test="description"
                    ></textarea>
                    <button
                        type="submit"
                        disabled={sendPost}
                        data-test="publish-btn"
                    >
                        {sendPost ? "Publishing..." : "Publish"}
                    </button>
                </form>
            </StyledDivSecundary>
        </StyledSection>
    )
}