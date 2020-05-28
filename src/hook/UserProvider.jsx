import React, {createContext, useContext, useEffect, useState} from 'react'
import {getTokens, saveTokens, deleteTokens} from '../utils/manage-tokens'

const initialState = {
    accessToken: undefined,
}

const UserContext = createContext(initialState)

export const UserProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(getTokens)
    const [user, setUser] = useState()

    useEffect(() => {
        if(!accessToken){
            deleteTokens()
            return
        }
        // console.log('in UserProvider', accessToken)
        setUser(JSON.parse(accessToken.user))
        saveTokens(accessToken)
    }, [accessToken])

    return (
        <UserContext.Provider value={{ accessToken, setAccessToken, user }}>
            <>
                {children}
            </>
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)
