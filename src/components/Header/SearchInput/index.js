import { useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { HeaderContext } from "../../../contexts/HeaderContext";
import { InputWrapper, StyledInput, UsersInSearch } from "./styles"

export default function SearchInput() {

    const {
        usersSearchFiltered,
        setHeaderInputValue,
        headerInputValue
    } = useContext(HeaderContext)

    return (
        <InputWrapper>
            <StyledInput
                placeholder="Search for people..."
                value={headerInputValue}
                onChange={(e) => { setHeaderInputValue(e.currentTarget.value) }}
                type="text"
                data-test="search"
            />
            <i><FaSearch style={{ color: "gray" }} /></i>
            <UsersInSearch usersSearchFiltered={usersSearchFiltered}>
                {usersSearchFiltered.map((user, index) => (
                    <ul key={index} data-test="user-search">
                        <img src={user.image} alt="user search img" />
                        <p>{user.name}</p>
                    </ul>
                ))}
            </UsersInSearch>
        </InputWrapper>
    )
}