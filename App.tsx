import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { ThemeProvider } from './context/ThemeContext'
import Navigator from './navigation/Navigator'

const fetchFonts = async () => {
    return await Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    })
}

export default function App() {
    const [fontLoaded, setFontLoaded] = useState(false)

    if (!fontLoaded) {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onFinish={() => {
                    setFontLoaded(true)
                }}
            />
        )
    }

    return (
        <ThemeProvider>
            {/* <ApplicationContent currentTheme={theme} toggleTheme={toggleTheme} /> */}
            <Navigator />
        </ThemeProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    text: { marginVertical: 16 },
})
