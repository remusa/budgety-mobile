import React from 'react'
import { BottomNavigation, BottomNavigationTab } from 'react-native-ui-kitten'

interface Props {}

const BottomNavigationContent: React.FC<Props> = props => {
    const onTabSelect = selectedIndex => {
        const { index: currentIndex, routes } = props.navigation.state
        const selectedRoute = routes[selectedIndex]
        props.navigation.navigate(selectedRoute.routeName)
    }

    return (
        <BottomNavigation selectedIndex={props.navigation.state.index} onSelect={onTabSelect}>
            <BottomNavigationTab title="Past" />
            <BottomNavigationTab title="Current" />
            <BottomNavigationTab title="Future" />
        </BottomNavigation>
    )
}

export default BottomNavigationContent
