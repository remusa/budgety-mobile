import React from 'react'
import { StyleSheet } from 'react-native'
import { Button, Layout, Text, TopNavigation } from 'react-native-ui-kitten'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { FIREBASE_SIGNOUT } from './../../utils/auth'

interface Props {
    navigation: NavigationStackScreenProps<{
        navigate: any
    }>
}

const HomeScreen: React.FC<Props> = props => {
    // AsyncStorage.getItem('userData').then(data => {
    //     let user_data = JSON.parse(data)
    //     console.log('userData', Object.entries(userData))
    // })

    const handleLogout = () => {
        FIREBASE_SIGNOUT().then(() => {
            props.navigation.navigate('Auth')
        })
    }

    const onPress = () => {
        props.navigation.navigate('Settings')
    }

    return (
        <Layout style={styles.container}>
            <Text category={'h1'}>Home</Text>

            <Button onPress={onPress}>Settings</Button>

            <Button onPress={handleLogout}>Logout</Button>
        </Layout>
    )
}

// HomeScreen.navigationOptions = {
//     headerTitle: 'Home',
// }

export const TopNavigationSimpleUsageShowcase = () => (
    <TopNavigation title="Home" />
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        paddingBottom: 32,
    },
})

export default HomeScreen
