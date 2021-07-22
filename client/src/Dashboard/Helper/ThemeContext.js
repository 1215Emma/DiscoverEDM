import React, { useContext, useState } from 'react'

const ThemeContext = React.createContext()
const ThemeUpdateContext = React.createContext()

export const useTheme = () => {
    return useContext(ThemeContext)
}

export const useThemeUpdate = () => {
    return useContext(ThemeUpdateContext)
}

export const ThemeProvider = ({ children }) => {
    const [lightTheme, setLightTheme] = useState(false)

const toggleTheme = () => {
        setLightTheme(prevLightTheme => !prevLightTheme)
    }
    console.log(lightTheme)
    return (
        <ThemeContext.Provider value={lightTheme}>
            <ThemeUpdateContext.Provider value={toggleTheme}>
                {children}
            </ThemeUpdateContext.Provider>
        </ThemeContext.Provider>
    )
}