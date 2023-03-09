import Header from "../../components/Header"
import { Wrapper } from "./styles"

export const NotFound = () => {
    return (
        <>
            <Header></Header>
            <Wrapper>
                <p>404: Página não encontrada</p>
            </Wrapper>
        </>
    )
}