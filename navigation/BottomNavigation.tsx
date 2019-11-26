import React from 'react'
import { BottomNavigation, BottomNavigationTab, Icon } from 'react-native-ui-kitten'

const ArrowLeftIcon = style => <Icon {...style} name='arrow-left' />
const ArrowRightIcon = style => <Icon {...style} name='arrow-right' />
const DashboardIcon = style => <Icon {...style} name='layout' />

interface Props {}

const BottomNavigationContent: React.FC<Props> = props => {
    const onTabSelect = selectedIndex => {
        const { index: currentIndex, routes } = props.navigation.state
        const selectedRoute = routes[selectedIndex]
        props.navigation.navigate(selectedRoute.routeName)
    }

    return (
        <BottomNavigation selectedIndex={props.navigation.state.index} onSelect={onTabSelect}>
            <BottomNavigationTab title='Past Months' icon={ArrowLeftIcon} />
            <BottomNavigationTab title='Current' icon={DashboardIcon} />
            <BottomNavigationTab title='Future' icon={ArrowRightIcon} />
        </BottomNavigation>
    )
}

export default BottomNavigationContent
