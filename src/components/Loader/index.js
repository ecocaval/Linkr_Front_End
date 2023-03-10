import { Wrapper } from "./styles"
import { LineWave } from 'react-loader-spinner'

export default function Loader() {
    return (
        <Wrapper>
            <p>Carregando</p>
            <LineWave
                color="#FFF"
                // wrapperStyle={{top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
            />
        </Wrapper>
    )
}