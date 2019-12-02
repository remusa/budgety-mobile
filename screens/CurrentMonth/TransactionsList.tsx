import { User } from 'firebase'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Button, Layout, List, ListItem, Text } from 'react-native-ui-kitten'
import Firebase, { firestore } from '../../utils/Firebase'
import { DELETE_TRANSACTION } from '../../utils/transactions'
import { ITransaction } from './CurrentMonthScreen'

interface Props {}

const TransactionsList: React.FC<Props> = () => {
  const [transactions, setTransactions] = useState<Array<ITransaction>>([])

  useEffect(() => {
    const user: User | null = Firebase.auth().currentUser

    if (!user) {
      throw new Error(`User not found`)
    }

    let unsubscribe: any = null
    const allTransactions = []

    const fetchTransactions = () => {
      unsubscribe = firestore
        .collection('users')
        .doc(user.uid)
        .collection('transactions')
        .onSnapshot(snapshot => {
          snapshot.forEach(doc => {
            const transaction = { ...doc.data(), id: doc.id }
            allTransactions.concat([...allTransactions, transaction])
          })
        })
    }

    fetchTransactions()
    setTransactions(allTransactions)

    return () => unsubscribe()
  }, [])

  const deleteItem = async (id: string) => {
    await DELETE_TRANSACTION(id)
  }

  const renderItemAccessory = props => {
    return (
      <Button status={'danger'} onPress={() => deleteItem(props)}>
        Delete
      </Button>
    )
  }

  const renderItem = ({ item, index }) => {
    const timestamp = new Date(item.date.seconds * 1000)

    return (
      <ListItem
        // onPress={() => console.log(`INDEX: ${index} - ITEM: ${Object.entries(item)}`)}
        accessory={() => renderItemAccessory(item.id)}
        style={styles.listItem}
        title={`${item.note}`}
        description={`${item.category} - ${item.amount} \n
        on ${timestamp.getFullYear()}/${timestamp
          .getMonth()
          .toString()
          .padStart(2, '0')}/${timestamp
          .getDate()
          .toString()
          .padStart(2, '0')}`}
      />
    )
  }

  return (
    <Layout style={styles.container}>
      <Text category='h4'>Transactions List</Text>

      <List style={styles.list} data={transactions} renderItem={renderItem} />
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  list: {},
  listItem: {},
})

export default TransactionsList
