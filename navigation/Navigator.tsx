import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import AuthScreen from '../screens/Auth/AuthScreen'
import CurrentMonthScreen from '../screens/CurrentMonth/CurrentMonthScreen'
import PastMonthsScreen from '../screens/PastMonths/PastMonthsScreen'
import SettingsScreen from '../screens/Settings/SettingsScreen'
import TransactionScreen from '../screens/Transaction/TransactionScreen'
import FutureScreen from './../screens/Future/FutureScreen'
import BottomNavigationContent from './BottomNavigation'
import DrawerNavigation from './DrawerNavigation'

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

const AuthStack = createStackNavigator(
    {
        Auth: {
            screen: AuthScreen,
            navigationOptions: {
                headerTitle: 'Authenticate',
            },
        },
    },
    {
        defaultNavigationOptions: defaultNavOptions,
    }
)

const PastMonthStack = createStackNavigator({
    PastMonth: {
        screen: PastMonthsScreen,
        navigationOptions: {
            headerTitle: 'Past Months',
        },
    },
})

const CurrentMonthStack = createStackNavigator({
    CurrentMonth: {
        screen: CurrentMonthScreen,
        navigationOptions: {
            headerTitle: 'Current Month',
        },
    },
    Transaction: {
        screen: TransactionScreen,
        navigationOptions: {
            headerTitle: 'Transaction',
        },
    },
    Settings: {
        screen: SettingsScreen,
        navigationOptions: {
            headerTitle: 'Settings',
        },
    },
})

const FutureStack = createStackNavigator({
    Future: {
        screen: FutureScreen,
        navigationOptions: {
            headerTitle: 'Future',
        },
    },
})

const MainTabs = createBottomTabNavigator(
    {
        Past: {
            screen: PastMonthStack,
            navigationOptions: {
                tabBarLabel: 'Past Months',
            },
        },
        Current: {
            screen: CurrentMonthStack,
            navigationOptions: {
                tabBarLabel: 'Current Month',
            },
        },
        Future: {
            screen: FutureStack,
            navigationOptions: {
                tabBarLabel: 'Future',
            },
        },
    },
    {
        initialRouteName: 'Current',
        tabBarComponent: BottomNavigationContent,
        // defaultNavigationOptions: defaultNavOptions,
        // tabBarOptions: {
        // activeTintColor: '#e91e63',
        // labelStyle: {
        //     fontSize: 12,
        // },
        // style: {
        //     backgroundColor: 'blue',
        // },
        // },
    }
)

const MainDrawer = createDrawerNavigator(
    {
        Home: {
            screen: MainTabs,
        },
        Settings: {
            screen: SettingsScreen,
        },
    },
    {
        contentComponent: DrawerNavigation,
    }
)

// const AppModalStack = createStackNavigator(
//     {
//         App: MainDrawer,
//         Promotion1: {
//             screen: Example,
//         },
//     },
//     {
//         mode: 'modal',
//         headerMode: 'none',
//     }
// )

const MainNavigator = createSwitchNavigator({
    // AuthLoading: AuthLoadingScreen,
    Auth: AuthStack,
    App: MainDrawer, // MainTabs
    // App: AppModalStack,
})

export default createAppContainer(MainNavigator)
