import { useContext } from "react";
import { DebounceInput } from 'react-debounce-input';
import { useNavigate } from "react-router-dom";
import { HeaderContext } from "../../../contexts/HeaderContext";
import { UserContext } from "../../../contexts/UserProvider";
import { InputWrapper, StyledInput, UsersInSearch } from "./styles"
import { v4 as uuidv4} from "uuid"

export default function MobileSearchInput() {

    const {
        usersSearchFiltered,
        setHeaderInputValue,
        headerInputValue
    } = useContext(HeaderContext)

    const navigate = useNavigate()

    const {
        setUserSelected
    } = useContext(UserContext)

    return (
        <InputWrapper>
            <StyledInput>
                <DebounceInput
                    minLength={3}
                    debounceTimeout={300}
                    placeholder="Search for people..."
                    value={headerInputValue}
                    onChange={(e) => { setHeaderInputValue(e.target.value) }}
                    type="text"
                    data-test="search"
                />
            </StyledInput>
            <UsersInSearch usersSearchFiltered={usersSearchFiltered}>
                {usersSearchFiltered.map((user) => (
                    <ul key={uuidv4()} data-test="user-search" onClick={() => {
                        setUserSelected(user)
                        navigate(`/user/${user.id}`)
                    }}>
                        <img src={user.image} alt="user search img" />
                        <p>{user.name}</p>
                        {user.imFollowing && <p style={{color: "#C5C5C5"}}>• following</p>}
                    </ul>
                ))}
            </UsersInSearch>
        </InputWrapper>
    )
}