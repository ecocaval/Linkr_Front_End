import { createContext, useState } from "react";

export const MobileSearchContext = createContext();

export function MobileProvider({ children }) {

    const [showMobileSearchInput, setShowMobileSearchInput] = useState(true)

    return (
        <MobileSearchContext.Provider
            value={{ showMobileSearchInput, setShowMobileSearchInput }}
        >
            {children}
        </MobileSearchContext.Provider>
    )
}