import { useContext, useEffect, useState } from "react"
import { IoIosArrowDown } from "react-icons/io"
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
import { LoginContext } from "../../contexts/LoginProvider";
import { PostsContext } from "../../contexts/PostsProvider";
import SearchInput from "./SearchInput";
import { FaSearch } from "react-icons/fa";
import MobileSearchInput from "./MobileSearchInput";
import getUsers from "../../utils/getUsers";
import { UserContext } from "../../contexts/UserProvider";
import { useNavigate } from "react-router-dom";
import { MobileSearchContext } from "../../contexts/MobileProvider";
import handleMyUser from "../../utils/handleMyUser";
import cleanStates from "./utils/cleanStates";

export default function Header() {

    const {
        users,
        setUsers,
        mustUpdateUsers,
        setMustUpdateUsers,
        myUser,
        setMyUser,
        returnToSignUp,
        setUserSelected,
        setReturnToSignUp
    } = useContext(UserContext)

    const {
        showMobileSearchInput,
        setShowMobileSearchInput
    } = useContext(MobileSearchContext)

    const {
        setPosts,
        setUserPosts,
        setHashtagPosts,
        setUpdatedPosts,
        setPostsToUpdate,
        setMustUpdatePosts,
        setSendPost,
        setGotPosts,
    } = useContext(PostsContext)

    const {
        setSentLogin
    } = useContext(LoginContext)

    const navigate = useNavigate()

    const [headerInputValue, setHeaderInputValue] = useState("")
    const [arrowWasClicked, setArrowWasClicked] = useState(false)
    const [arrowWasFirstClicked, setArrowWasFirstClicked] = useState(false)
    const [usersSearchFiltered, setUsersSearchFiltered] = useState([])

    useEffect(() => {
        if (returnToSignUp) {
            setReturnToSignUp(false)
            navigate('/')
        }
    }, [returnToSignUp, navigate, setReturnToSignUp])

    useEffect(() => {
        setUsersSearchFiltered(filterUsersByInput(users, headerInputValue))
        // eslint-disable-next-line
    }, [headerInputValue])

    useEffect(() => {
        setMustUpdateUsers(false)
        getUsers(setUsers, 'users');
        handleMyUser(setMyUser, setReturnToSignUp)
        // eslint-disable-next-line
    }, [mustUpdateUsers])

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
                        data-test="menu"
                    >
                        <p data-test="logout" onClick={() => {
                            localStorage.clear()
                            cleanStates({
                                setSentLogin,
                                setPosts,
                                setUserPosts,
                                setHashtagPosts,
                                setUpdatedPosts,
                                setPostsToUpdate,
                                setMustUpdatePosts,
                                setSendPost,
                                setGotPosts,
                                setMyUser,
                                setUserSelected
                            })
                            navigate('/')
                        }}>Logout</p>
                    </LogoutModal>
                    {showMobileSearchInput && <MobileSearchInput />}
                </HeaderCSSvariables>
            </HeaderContext.Provider>
        </>
    )
}