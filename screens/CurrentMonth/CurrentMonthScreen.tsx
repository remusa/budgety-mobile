import React from 'react'
import { StyleSheet } from 'react-native'
import { Button, Layout, Text } from 'react-native-ui-kitten'

interface Props {}

const CurrentMonthScreen: React.FC<Props> = props => {
    return (
        <Layout style={styles.container}>
            <Text category="h1">Current Month</Text>

            <Button onPress={() => console.log('Add transaction')}>Add transaction</Button>
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100%',
        padding: 32,
    },
})

export default CurrentMonthScreen
