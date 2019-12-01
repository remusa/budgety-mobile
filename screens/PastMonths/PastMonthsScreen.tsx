import React from 'react'
import { StyleSheet } from 'react-native'
import { Layout, Text } from 'react-native-ui-kitten'
import { FIREBASE_SIGNOUT } from '../../utils/auth'

interface Props {}

const LastMonthsScreen: React.FC<Props> = props => {
  const handleLogout = () => {
    FIREBASE_SIGNOUT().then(() => {
      props.navigation.navigate('Auth')
    })
  }

  return (
    <Layout style={styles.container}>
      <Text category='h1'>Past Months</Text>

      {/* <Button onPress={handleLogout}>Logout</Button> */}
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
  },
})

export default LastMonthsScreen
