import { useState } from "react"
import { IoIosArrowDown } from "react-icons/io"
import { FaSearch } from "react-icons/fa";
import emptyUserImage from "../../assets/images/emptyUserImage.png"
import { ArrowController, CSSvariables, InputWrapper, LogoutModal, StyledHeader, StyledInput, StyledLogo, StyledUserAside } from "./styles"
import logUserOff from "./utils/logUserOff"

export default function Header() {

    const [headerInputValue, setHeaderInputValue] = useState("")
    const [userImage, setUserImage] = useState(emptyUserImage)
    const [arrowWasClicked, setArrowWasClicked] = useState(false)

    const usersInSearch = [{
        picture_url: "https://www.pngitem.com/pimgs/m/504-5040528_empty-profile-picture-png-transparent-png.png",

    }]

    return (
        <>
            <CSSvariables>
                <StyledHeader>
                    <StyledLogo>linkr</StyledLogo>
                    <InputWrapper>
                        <StyledInput
                            placeholder="Search for people"
                            value={headerInputValue}
                            onChange={(e) => { setHeaderInputValue(e.currentTarget.value) }}
                            type="text"
                            data-test="search"
                        />
                        <i><FaSearch style={{ color: "gray" }} /></i>
                    </InputWrapper>
                    <StyledUserAside>
                        <ArrowController
                            arrowWasClicked={arrowWasClicked}
                            onClick={() => {
                                setArrowWasClicked(!arrowWasClicked)
                            }}
                        >
                            <IoIosArrowDown style={{
                                color: "#FFFFFF",
                                minWidth: "30px",
                                height: "30px",
                            }} />
                        </ArrowController>
                        <img
                            src={userImage}
                            alt="User img"
                            data-test="avatar"
                        />
                    </StyledUserAside>
                </StyledHeader>
                <LogoutModal
                    arrowWasClicked={arrowWasClicked}
                    onClick={() => {
                        logUserOff()
                    }}
                    data-test="menu"
                >
                    <p data-test="logout">Logout</p>
                </LogoutModal>
            </CSSvariables>
        </>
    )
}