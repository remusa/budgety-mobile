import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createStackNavigator } from 'react-navigation-stack'
import AuthScreen from '../screens/Auth/AuthScreen'
import HomeScreen from '../screens/Home/HomeScreen'
import SettingsScreen from '../screens/Settings/SettingsScreen'

const defaultNavOptions = {
    // headerStyle: {
    //     backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
    // },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold',
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans',
    },
    // headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
}

const AuthStackNavigator = createStackNavigator(
    {
        Auth: AuthScreen,
    },
    {
        defaultNavigationOptions: defaultNavOptions,
    }
)

const StackNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen,
    },
    Settings: {
        screen: SettingsScreen,
    },
})

const DrawerNavigator = createDrawerNavigator(
    {
        Home: HomeScreen,
        Settings: SettingsScreen,
    }
    // {
    //     contentComponent: DrawerNavigation,
    // }
)

const MainNavigator = createSwitchNavigator({
    // AuthLoading: AuthLoadingScreen,
    Auth: AuthStackNavigator,
    Stack: StackNavigator,
    // Drawer: DrawerNavigator,
})

export default createAppContainer(MainNavigator)
