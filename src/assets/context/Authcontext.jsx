import React, { createContext, useContext, useEffect, useState } from 'react'

const userContext = createContext()

const Authcontext = ({ children }) => {
    const [user, setUser ]  = useState(null)

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if(user){
            setUser(JSON.parse(storedUser))
        }
    }, [])

    const login = (user) => {
        localStorage.setItem('user', JSON.stringify(user))
        setUser(user)
    }
    const logout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        setUser(null)
    }
    
    return (
        <userContext.Provider
            value={{ user, login, logout }}
        >
            {children}
        </userContext.Provider >

    )
}

export const useAuth = () => useContext(userContext)

export default Authcontext