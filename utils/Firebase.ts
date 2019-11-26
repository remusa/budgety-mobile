import firebase from 'firebase'
import 'firebase/firestore'
import {
    API_KEY,
    APP_ID,
    AUTH_DOMAIN,
    DATABASE_URL,
    MESSAGE_SENDER_ID,
    PROJECT_ID,
} from 'react-native-dotenv'

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    databaseURL: DATABASE_URL,
    projectId: PROJECT_ID,
    storageBucket: '',
    messagingSenderId: MESSAGE_SENDER_ID,
    appId: APP_ID,
}

// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig)

export const firestore = Firebase.firestore()

export default Firebase
