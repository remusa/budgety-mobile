import React from 'react'
import { StyleSheet } from 'react-native'
import { Drawer, DrawerHeaderFooter, Icon, Layout } from 'react-native-ui-kitten'
import { SafeAreaView } from 'react-navigation'
import { NavigationStackScreenProps } from 'react-navigation-stack'

const PersonIcon = style => <Icon {...style} name="person" />

interface Props {
    navigation: NavigationStackScreenProps<{
        navigate: any
    }>
}

const DrawerNavigation: React.FC<Props> = props => {
    const drawerData = [
        { title: 'Home' },
        { title: 'Settings' },
        // { title: 'Articles' },
        // { title: 'Ecommerce' },
        // { title: 'Chat' },
    ]

    const onRouteSelect = index => {
        const { [index]: route } = drawerData
        // navigate with React Navigation
        props.navigation.navigate(route.title)
    }

    const renderProfileHeader = () => (
        <DrawerHeaderFooter
            title="John Doe"
            description="React Native Developer"
            icon={PersonIcon}
        />
    )

    return (
        <Layout style={styles.container}>
            <SafeAreaView>
                <Drawer data={drawerData} header={renderProfileHeader} onSelect={onRouteSelect} />
            </SafeAreaView>
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
})

export default DrawerNavigation
