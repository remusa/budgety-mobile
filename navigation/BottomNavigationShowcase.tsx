import React from 'react'
import { BottomNavigation, BottomNavigationTab } from 'react-native-ui-kitten'

interface Props {}

const BottomNavigationShowcase: React.FC<Props> = props => {
    console.log('props', props)
    const onTabSelect = selectedIndex => {
        const { [index]: selectedRoute } = props.navigation.state.routes
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

export default BottomNavigationShowcase
