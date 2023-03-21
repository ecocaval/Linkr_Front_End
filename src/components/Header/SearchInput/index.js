import { useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { DebounceInput } from 'react-debounce-input';
import { HeaderContext } from "../../../contexts/HeaderContext";
import { InputWrapper, StyledInput, UsersInSearch } from "./styles"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts/UserProvider";

export default function SearchInput() {

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
            <i><FaSearch style={{ color: "gray" }} /></i>
            <UsersInSearch usersSearchFiltered={usersSearchFiltered}>
                {usersSearchFiltered.map((user, index) => (
                    <ul key={index} data-test="user-search" onClick={() => {
                        setUserSelected(user)
                        navigate(`/user/${user.id}`)
                    }}>
                        <div>
                            <img src={user.image} alt="user search img" />
                            <p>{user.name}</p>
                        </div>
                        <div className="division-line" />
                    </ul>
                ))}
            </UsersInSearch>
        </InputWrapper>
    )
}