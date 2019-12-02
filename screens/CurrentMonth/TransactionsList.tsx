import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Button, Layout, List, ListItem, Text } from 'react-native-ui-kitten'
import { DELETE_TRANSACTION, GET_TRANSACTIONS } from '../../utils/transactions'
import { ITransaction } from './CurrentMonthScreen'

interface Props {
  transaction: ITransaction
}

const TransactionsList: React.FC<Props> = ({ transaction }) => {
  const [transactions, setTransactions] = useState<Array<ITransaction>>([])

  useEffect(() => {
    const fetchTransactions = async () => {
      const res = await GET_TRANSACTIONS()
      setTransactions(res)
    }

    fetchTransactions()
  }, [transaction])

  const deleteItem = async (id: string) => {
    const filteredTransactions = transactions.filter(transaction => transaction.id !== id)
    setTransactions(filteredTransactions)

    await DELETE_TRANSACTION(id)
  }

  // const renderItemAccessory = (id: string) => {
  //   return <Button onPress={() => console.log(id)}>Delete</Button>
  // }
  const renderItemAccessory = props => {
    return <Button onPress={() => deleteItem(props)}>Delete</Button>
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
