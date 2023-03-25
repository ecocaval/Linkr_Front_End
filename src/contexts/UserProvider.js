import { createContext, useState } from "react";
import emptyUserImage from "../../src/assets/images/emptyUserImage.png"

export const UserContext = createContext();

export function UserProvider({ children }) {

    const [users, setUsers] = useState([])
    const [mustUpdateUsers, setMustUpdateUsers] = useState(false)
    const [myUser, setMyUser] = useState({ image: emptyUserImage })
    const [returnToSignUp, setReturnToSignUp] = useState(false)
    const [userSelected, setUserSelected] = useState(null)

    return (
        <UserContext.Provider
            value={{
                users,
                setUsers,
                mustUpdateUsers,
                setMustUpdateUsers,
                myUser,
                setMyUser,
                userSelected,
                setUserSelected,
                returnToSignUp,
                setReturnToSignUp,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}