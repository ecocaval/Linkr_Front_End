import { useContext, useEffect, useState } from "react"
import { IoIosArrowDown } from "react-icons/io"
import logUserOff from "./utils/logUserOff"
import filterUsersByInput from "./utils/filterUsersByInput";
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
import SearchInput from "./SearchInput";
import { FaSearch } from "react-icons/fa";
import MobileSearchInput from "./MobileSearchInput";
import getUsers from "../../utils/getUsers";
import { MyUserContext } from "../../contexts/MyUserContext";

export default function Header() {

    const { myUser } = useContext(MyUserContext)

    const [users, setUsers] = useState([])
    const [headerInputValue, setHeaderInputValue] = useState("")
    const [arrowWasClicked, setArrowWasClicked] = useState(false)
    const [arrowWasFirstClicked, setArrowWasFirstClicked] = useState(false)
    const [usersSearchFiltered, setUserSearchFiltered] = useState([])
    const [showMobileSearchInput, setShowMobileSearchInput] = useState(true)

    useEffect(() => {
        setUserSearchFiltered(filterUsersByInput(users, headerInputValue))
        // eslint-disable-next-line
    }, [headerInputValue])

    useEffect(() => {
        getUsers(setUsers, 'users');
    }, [])

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
                                src={myUser.image}
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