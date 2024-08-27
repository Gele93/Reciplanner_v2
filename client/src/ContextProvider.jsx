import React, { createContext, useState } from 'react'

export const RecipeContext = createContext(null)

function ContextProvider({ children }) {

    const [user, setUser] = useState("")

    return (
        <RecipeContext.Provider value={{ user, setUser }}>
            {children}
        </RecipeContext.Provider>
    )
}

export default ContextProvider