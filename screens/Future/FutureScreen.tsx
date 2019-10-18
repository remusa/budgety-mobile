import React from 'react'
import { StyleSheet } from 'react-native'
import { Button, Layout, Text } from 'react-native-ui-kitten'
import { FIREBASE_SIGNOUT } from '../../utils/auth'

interface Props {}

const FutureScreen: React.FC<Props> = props => {
    const handleLogout = () => {
        FIREBASE_SIGNOUT().then(() => {
            props.navigation.navigate('Auth')
        })
    }

    return (
        <Layout style={styles.container}>
            <Text category="h1">Future</Text>

            <Button onPress={handleLogout}>Logout</Button>
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100%',
    },
})

export default FutureScreen
