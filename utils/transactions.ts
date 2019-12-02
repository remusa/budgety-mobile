import { User } from 'firebase'
import { ITransaction } from '../screens/CurrentMonth/CurrentMonthScreen'
import firebase, { firestore } from './Firebase'

export const GET_TRANSACTIONS = async () => {
  const user: User | null = firebase.auth().currentUser

  if (!user) {
    throw new Error(`User not found`)
  }

  const transactions: Array<ITransaction | any> = []

  const snapshot = await firestore
    .collection('users')
    .doc(user.uid)
    .collection('transactions')
    .orderBy('date', 'desc')
    .get()

  snapshot.forEach(doc => {
    transactions.push({ ...doc.data(), id: doc.id })
  })

  return transactions
}

export const POST_TRANSACTION = async transaction => {
  const user: User | null = firebase.auth().currentUser

  if (!user) {
    throw new Error(`User not found`)
  }

  const res = await firestore
    .collection('users')
    .doc(user.uid)
    .collection('transactions')
    .add(transaction)
    .then(() => {})
    .catch(error => {
      console.error('Error writing document: ', error)
    })

  if (res !== null) {
    console.log('Document successfully written!')
  }
}

export const DELETE_TRANSACTION = async (id: string) => {
  const user: User | null = firebase.auth().currentUser

  if (!user) {
    throw new Error(`User not found`)
  }

  const res = await firestore
    .collection('users')
    .doc(user.uid)
    .collection('transactions')
    .doc(id)
    .delete()
    .catch(error => {
      console.error('Error deleting document: ', error)
    })

  if (res !== null) {
    console.log('Document successfully deleted!')
  }
}

export const UPDATE_TRANSACTION = async ({ transaction, changes }) => {
  const user: User | null = firebase.auth().currentUser

  if (!user) {
    throw new Error(`User not found`)
  }

  const res = await firestore
    .collection('users')
    .doc(user.uid)
    .collection('transactions')
    .doc(transaction.id)
    .set({ ...transaction, changes })
    .catch(error => {
      console.error('Error updating document: ', error)
    })

  if (res !== null) {
    console.log('Document successfully updated!')
  }
}
