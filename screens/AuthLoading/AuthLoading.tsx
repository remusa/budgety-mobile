import React, { useEffect } from 'react'
import { AsyncStorage, StatusBar } from 'react-native'
import { Layout, Spinner } from 'react-native-ui-kitten'
import { NavigationStackScreenProps } from 'react-navigation-stack'

interface Props {
    navigation: NavigationStackScreenProps<{
        navigate: any
    }>
}

const AuthLoadingScreen: React.FC<Props> = props => {
    const _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken')

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        props.navigation.navigate(userToken ? 'App' : 'Auth')
    }

    useEffect(() => {
        _bootstrapAsync()
    }, [])

    return (
        <Layout>
            <Spinner />
            <StatusBar barStyle="default" />
        </Layout>
    )
}

export default AuthLoadingScreen
