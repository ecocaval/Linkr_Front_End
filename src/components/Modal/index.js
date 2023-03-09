import { StyledModal, Wrapper } from "./styles";

export default function Modal(props) {
    return (
        <Wrapper
            onClick={() => {props.setShowModal(false)}}
        >
            <StyledModal onClick={e => e.stopPropagation()}>
                <div>{props.children}</div>
            </StyledModal>
        </Wrapper>
    )
}