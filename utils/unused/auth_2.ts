import { AsyncStorage } from 'react-native'
import { API_KEY } from 'react-native-dotenv'

export const SIGN_UP = async (email, password) => {
    const response: void | Response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                body: JSON.stringify({
                    email,
                    password,
                    returnSecureToken: true,
                }),
            },
        }
    ).catch(e => {
        const errorId = e.message
        if (errorId === 'EMAIL_EXISTS') {
            throw new Error(`Email already exists.`)
        } else if (errorId === 'OPERATION_NOT_ALLOWED') {
            throw new Error(`Password sign-in is disabled.`)
        } else if (errorId === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
            throw new Error(
                'We have blocked all requests from this device due to unusual activity. Try again later.'
            )
        }
    })

    if (response) {
        const res = await response.json()
        console.log('res', Object.entries(res))
        await AsyncStorage.setItem('userToken', res.idToken)
        await AsyncStorage.setItem('userId', res.localId)
    }
}

export const SIGN_IN = async (email, password) => {
    const response: void | Response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                body: JSON.stringify({
                    email,
                    password,
                    returnSecureToken: true,
                }),
            },
        }
    ).catch(e => {
        const errorId = e.message
        if (errorId === 'EMAIL_NOT_FOUND') {
            throw new Error(`Email wasn't found.`)
        } else if (errorId === 'INVALID_PASSWORD') {
            throw new Error(`Invalid credentials.`)
        } else if (errorId === 'USER_DISABLED') {
            throw new Error('Account has been disabled by an administrator.')
        }
    })

    if (response) {
        const res = await response.json()
        console.log('res', Object.entries(res))
        await AsyncStorage.setItem('userToken', res.idToken)
        await AsyncStorage.setItem('userId', res.localId)
    }
}

export const LOGOUT = async () => {
    const keys = ['userToken', 'userId']
    await AsyncStorage.multiRemove(keys)
}
