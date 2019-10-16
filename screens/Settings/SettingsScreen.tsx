import React, { useContext } from 'react'
import { StyleSheet } from 'react-native'
import { Layout, Text, Toggle } from 'react-native-ui-kitten'
import { ThemeContext } from '../../context/ThemeContext'

interface Props {
    // navigation: NavigationStackScreenProps<{
    //     navigate: any
    // }>
}

const SettingsScreen: React.FC<Props> = props => {
    const { theme, toggleTheme } = useContext(ThemeContext)

    return (
        <Layout style={styles.container}>
            <Text category={'h1'}>Settings</Text>

            <Toggle
                style={styles.toggle}
                text="Dark Mode"
                checked={theme !== 'light'}
                onChange={toggleTheme}
            />
        </Layout>
    )
}

// SettingsScreen.navigationOptions = {
//     headerTitle: 'Settings',
// }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 16,
    },
    toggle: {
        marginTop: 8,
        marginVertical: 4,
        marginHorizontal: 4,
    },
})

export default SettingsScreen
