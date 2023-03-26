import { StyledModal, Wrapper } from "./styles";

export default function Modal(props) {
    return (
        <Wrapper
            onClick={() => {props.setIdOfDeletion(-Infinity)}}
        >
            <StyledModal onClick={e => e.stopPropagation()}>
                <div>{props.children}</div>
            </StyledModal>
        </Wrapper>
    )
}