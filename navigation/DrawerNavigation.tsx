import React from 'react'
import { StyleSheet } from 'react-native'
import { Button, Drawer, DrawerHeaderFooter, Icon, Layout } from 'react-native-ui-kitten'
import { SafeAreaView } from 'react-navigation'
import { FIREBASE_SIGNOUT } from '../utils/auth'

const PersonIcon = style => <Icon {...style} name='person' />
const HomeIcon = style => <Icon {...style} name='layout' />
const SettingsIcon = style => <Icon {...style} name='settings' />
const LogoutIcon = style => <Icon {...style} name='log-out' />

interface Props {
  // navigation: NavigationStackScreenProps<{
  //     navigate: any
  // }>
}

const DrawerNavigation: React.FC<Props> = props => {
  const createDrawerItem = ({ routeName }) => ({
    title: routeName,
  })

  // const drawerData = props.items.map(createDrawerItem)
  const drawerData = [
    { title: 'Home', icon: HomeIcon },
    { title: 'Settings', icon: SettingsIcon },
  ]

  const onRouteSelect = selectedIndex => {
    // const { routes } = props.navigation.state
    const { [selectedIndex]: route } = drawerData
    // console.log('routes', routes)
    console.log('selectedIndex', selectedIndex)

    // console.log('drawerData', drawerData)
    // const { menuIndex: currentIndex } = drawerData
    // console.log('currentIndex', currentIndex)
    // props.navigation.navigate(currentIndex.screen)
    props.navigation.navigate(route.title)
  }

  const LogoutButton = style => {
    const handleLogout = () => {
      console.log('LOGGING OUT')
      FIREBASE_SIGNOUT().then(() => {
        props.navigation.navigate('Auth')
      })
    }

    return <Button style={style} icon={LogoutIcon} onPress={handleLogout} />
  }

  const renderProfileHeader = () => (
    <DrawerHeaderFooter
      title='John Doe'
      description='React Native Developer'
      icon={PersonIcon}
      accessory={LogoutButton}
    />
  )

  const renderFooter = () => <DrawerHeaderFooter description='Budgety' />

  return (
    <Layout style={styles.container}>
      <SafeAreaView>
        <Drawer
          data={drawerData}
          onSelect={onRouteSelect}
          header={renderProfileHeader}
          footer={renderFooter}
        />
      </SafeAreaView>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 32,
    height: '100%',
  },
})

export default DrawerNavigation
