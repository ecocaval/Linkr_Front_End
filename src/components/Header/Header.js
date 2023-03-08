import { useEffect, useState } from "react"
import { IoIosArrowDown } from "react-icons/io"
import emptyUserImage from "../../assets/images/emptyUserImage.png"
import logUserOff from "./utils/logUserOff"
import filterArrayByInput from "./utils/filterArrayByInput";
import {
    ArrowController,
    HeaderCSSvariables,
    LogoutModal,
    MobileSearcher,
    StyledHeader,
    StyledLogo,
    StyledUserAside,
} from "./styles"
import { HeaderContext } from "../../contexts/HeaderContext";
import SearchInput from "./SearchInput/SearchInput";
import { FaSearch } from "react-icons/fa";
import MobileSearchInput from "./MobileSearchInput/MobileSearchInput";

export default function Header() {

    // eslint-disable-next-line
    const [users, setUsers] = useState([])
    // eslint-disable-next-line
    const [userImage, setUserImage] = useState(emptyUserImage)
    const [headerInputValue, setHeaderInputValue] = useState("")
    const [arrowWasClicked, setArrowWasClicked] = useState(false)
    const [arrowWasFirstClicked, setArrowWasFirstClicked] = useState(false)
    const [usersSearchFiltered, setUserSearchFiltered] = useState([])
    const [showMobileSearchInput, setShowMobileSearchInput] = useState(false)

    useEffect(() => {
        setUserSearchFiltered(filterArrayByInput(users, headerInputValue))
        // eslint-disable-next-line
    }, [headerInputValue])

    return (
        <>
            <HeaderContext.Provider value={{
                usersSearchFiltered, setHeaderInputValue, headerInputValue
            }}>
                <HeaderCSSvariables>
                    {showMobileSearchInput && <MobileSearchInput />}
                    <StyledHeader>
                        <StyledLogo>linkr</StyledLogo>
                        <SearchInput />
                        <MobileSearcher>
                            <FaSearch
                                style={{
                                    color: "#FFFFFF",
                                    width: "25px",
                                    height: "25px"
                                }}
                                onClick={() => { setShowMobileSearchInput(!showMobileSearchInput) }}
                            />
                        </MobileSearcher>
                        <StyledUserAside>
                            <ArrowController
                                arrowWasClicked={arrowWasClicked}
                                arrowWasFirstClicked={arrowWasFirstClicked}
                                onClick={() => {
                                    setArrowWasClicked(!arrowWasClicked)
                                    if (!arrowWasFirstClicked) setArrowWasFirstClicked(true)
                                }}
                            >
                                <IoIosArrowDown style={{
                                    color: "#FFFFFF",
                                    width: "30px",
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
                        onClick={() => { logUserOff() }}
                        data-test="menu"
                    >
                        <p data-test="logout">Logout</p>
                    </LogoutModal>
                </HeaderCSSvariables>
            </HeaderContext.Provider>
        </>
    )
}