import { dark, light, mapping } from '@eva-design/eva'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import React, { createContext, useState } from 'react'
import { AsyncStorage } from 'react-native'
import { ApplicationProvider, IconRegistry } from 'react-native-ui-kitten'

interface IThemeContext {
    theme: string
    toggleTheme: () => void
}

const ThemeContext = createContext({} as IThemeContext)

interface Props {
    // children: HTMLElement | React.ReactNode
}

const ThemeProvider: React.FC<Props> = ({ children }) => {
    const [theme, setTheme] = useState(AsyncStorage.getItem('theme') || 'light')

    const availableThemes = { light, dark }

    const toggleTheme = () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(nextTheme)
        AsyncStorage.setItem('theme', nextTheme)
    }

    const stringTheme = theme === 'light' ? 'light' : 'dark'
    const currentTheme = theme === 'light' ? light : dark // themes[theme]

    return (
        <>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider mapping={mapping} theme={currentTheme}>
                <ThemeContext.Provider value={{ theme: stringTheme, toggleTheme }}>
                    {children}
                </ThemeContext.Provider>
            </ApplicationProvider>
        </>
    )
}

export { ThemeContext, ThemeProvider }
