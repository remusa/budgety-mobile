import { User } from 'firebase'
import Firebase, { firestore } from './Firebase'

export const SAVE_TRANSACTION = async ({ amount, category, note, date, type }) => {
    console.log(`transactions | SAVING: ${{ amount, category, note, date, type }}`)
    const user: User | null = Firebase.auth().currentUser

    if (!user) {
        throw new Error(`User not found`)
    }

    await firestore
        .collection('users')
        .doc(user.uid)
        .collection('transactions')
        .doc(type)
        .set({
            amount,
            category,
            note,
            date: firestore.Timestamp.fromDate(date),
            type,
        })

    return
}
