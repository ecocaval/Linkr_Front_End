import { useContext } from "react";
import { DebounceInput } from 'react-debounce-input';
import { useNavigate } from "react-router-dom";
import { HeaderContext } from "../../../contexts/HeaderContext";
import { UserContext } from "../../../contexts/UserProvider";
import { InputWrapper, StyledInput, UsersInSearch } from "./styles"

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
                {usersSearchFiltered.map((user, index) => (
                    <ul key={index} data-test="user-search" onClick={() => {
                        setUserSelected(user)
                        navigate(`/user/${user.id}`)
                    }}>
                        <img src={user.image} alt="user search img" />
                        <p>{user.name}</p>
                    </ul>
                ))}
            </UsersInSearch>
        </InputWrapper>
    )
}