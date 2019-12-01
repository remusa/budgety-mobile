import React from 'react'
import { Layout, List, ListItem, Text } from 'react-native-ui-kitten'
import { ITransaction } from './CurrentMonthScreen'

interface Props {
  transactions: Array<ITransaction>
}

const TransactionsList: React.FC<Props> = ({ transactions }) => {
  console.log('transactions', transactions)

  const renderItem = ({ item, index }) => {
    console.log('item', item)
    return (
      <ListItem title={`${item.note}`} description={`${item.note} - ${item.amount}`} />
      // <ListItem title={item.note} description={item.category} />
      // <Text>{item.amount}</Text>
      // <Text>{item.category}</Text>
      // <Text>{item.note}</Text>
      // <Text>{item.date.toString()}</Text>
      // </ListItem>
    )
  }

  return (
    <Layout>
      <Text category='h4'>Transactions List</Text>
      <List data={transactions} renderItem={renderItem} />
    </Layout>
  )
}

export default TransactionsList
