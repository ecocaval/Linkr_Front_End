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
import { UserContext } from "../../contexts/UserProvider";
import { useNavigate } from "react-router-dom";
import { MobileSearchContext } from "../../contexts/MobileProvider";

export default function Header() {

    const { myUser } = useContext(UserContext)
    const { showMobileSearchInput, setShowMobileSearchInput } = useContext(MobileSearchContext)
    const { returnToSignUp, setReturnToSignUp } = useContext(UserContext)

    const navigate = useNavigate()

    const [users, setUsers] = useState([])
    const [headerInputValue, setHeaderInputValue] = useState("")
    const [arrowWasClicked, setArrowWasClicked] = useState(false)
    const [arrowWasFirstClicked, setArrowWasFirstClicked] = useState(false)
    const [usersSearchFiltered, setUserSearchFiltered] = useState([])

    useEffect(() => {
        if (returnToSignUp) {
            setReturnToSignUp(false)
            navigate('/')
        }
    }, [returnToSignUp, navigate, setReturnToSignUp])

    useEffect(() => {
        setUserSearchFiltered(filterUsersByInput(users, headerInputValue))
        // eslint-disable-next-line
    }, [headerInputValue])

    useEffect(() => {
        getUsers(setUsers, 'users');
    }, [])

    function logout() {
        localStorage.clear()
        navigate('/')
    }

    return (
        <>
            <HeaderContext.Provider value={{
                usersSearchFiltered, setHeaderInputValue, headerInputValue
            }}>
                <HeaderCSSvariables>
                    <StyledHeader>
                        <StyledLogo onClick={() => { navigate('/timeline') }}>linkr</StyledLogo>
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
                                onClick={() => {
                                    setArrowWasClicked(!arrowWasClicked)
                                    if (!arrowWasFirstClicked) setArrowWasFirstClicked(true)
                                }}
                            />
                        </StyledUserAside>
                    </StyledHeader>
                    <LogoutModal
                        arrowWasClicked={arrowWasClicked}
                        onClick={() => { logUserOff() }}
                        data-test="menu"
                    >
                        <p data-test="logout" onClick={logout}>Logout</p>
                    </LogoutModal>
                    {showMobileSearchInput && <MobileSearchInput />}
                </HeaderCSSvariables>
            </HeaderContext.Provider>
        </>
    )
}