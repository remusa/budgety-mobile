import { AsyncStorage } from 'react-native'
// import AsyncStorage from '@react-native-community/async-storage'
import { User } from 'firebase'
import firebase, { db } from './Firebase'

export const getUser = async (uid: string) => {
    return await db
        .collection('users')
        .doc(uid)
        .get()
}

export const FIREBASE_SIGNUP = async (email: string, password: string) => {
    const response = await firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        // .then(() => this.props.navigation.navigate('Home'))
        .catch(error => {
            console.log(error)
            const errorCode = error.code
            const errorMessage = error.message
            if (errorCode === 'auth/weak-password') {
                throw new Error(`Password is too weak.`)
            } else {
                throw new Error(errorMessage)
            }
        })

    if (response) {
        const user: User = await firebase.auth().currentUser
        const currentUser = {
            uid: user.uid,
            email: user.email,
        }

        db.collection('users')
            .doc(response.user.uid)
            .set(currentUser)

        const token = await firebase.auth().currentUser.getIdToken()

        await AsyncStorage.setItem('userData', JSON.stringify(currentUser))
        await AsyncStorage.setItem('userToken', token)

        return
    }
}

export const FIREBASE_SIGNIN = async (email: string, password: string) => {
    const response = await firebase.auth()
        .signInWithEmailAndPassword(email, password)
        // .then(() => this.props.navigation.navigate('Home'))
        .catch(error => {
            const errorCode = error.code
            const errorMessage = error.message
            if (errorCode === 'auth/invalid-email') {
                throw new Error(`Email address is not valid.`)
            } else if (errorCode === 'auth/user-disabled') {
                throw new Error(`User corresponding to the given email has been disabled.`)
            } else if (errorCode === 'auth/user-not-found') {
                throw new Error(`No user corresponding to the given email.`)
            } else if (errorCode === 'auth/wrong-password') {
                throw new Error(`Wrong password.`)
            } else {
                throw new Error(errorMessage)
            }
        })

    if (response) {
        // const user: User = await Firebase.auth().currentUser
        const user = getUser(response.user.uid)
        // const data = user.data()

        const token = await firebase.auth().currentUser.getIdToken()

        await AsyncStorage.setItem('userData', JSON.stringify(user))
        await AsyncStorage.setItem('userToken', token)
        return
    }
}

export const FIREBASE_SIGNOUT = async () => {
    await firebase.auth()
        .signOut()
        .catch(error => console.log(error))

    const keys = ['userData', 'userToken']
    await AsyncStorage.multiRemove(keys)

    return
}
