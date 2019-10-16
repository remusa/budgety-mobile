import React from 'react'
import { StyleSheet } from 'react-native'
import { Layout } from 'react-native-ui-kitten'

const Card = props => {
    return <Layout style={{ ...styles.card, ...props.style }}>{props.children}</Layout>
}

const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        // backgroundColor: 'white'
    },
})

export default Card
