import { useState } from "react"
import { IoIosArrowDown } from "react-icons/io"
import emptyUserImage from "../../assets/images/emptyUserImage.png"
import { StyledHeader, StyledInput, StyledLogo, StyledUserAside } from "./styles"

export default function PageHeader() {

    const [headerInputValue, setHeaderInputValue] = useState("")
    const [userImage, setUserImage] = useState(emptyUserImage)

    return (
        <StyledHeader>
            <StyledLogo>linkr</StyledLogo>
            <StyledInput
                placeholder="Search for people"
                value={headerInputValue}
                onChange={(e) => { setHeaderInputValue(e.currentTarget.value) }}
                type="text"
            />
            <StyledUserAside>
                <IoIosArrowDown style={{
                    color: "#FFFFFF",
                    width: "30px",
                    height: "30px",
                }} />
                <img src={userImage} alt="User img" />
            </StyledUserAside>
        </StyledHeader>
    )
}