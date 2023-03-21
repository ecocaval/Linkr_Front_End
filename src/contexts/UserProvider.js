import { createContext, useState } from "react";
import emptyUserImage from "../../src/assets/images/emptyUserImage.png"

export const UserContext = createContext();

export function UserProvider({ children }) {

    const [myUser, setMyUser] = useState({ image: emptyUserImage })
    const [returnToSignUp, setReturnToSignUp] = useState(false)
    const [userSelected, setUserSelected] = useState(null)

    return (
        <UserContext.Provider
            value={{
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