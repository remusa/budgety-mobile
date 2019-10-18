import { Formik, FormikActions } from 'formik'
import React, { useEffect, useState } from 'react'
import { Alert, KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native'
import { Button, Icon, Input, Layout, Spinner, Text } from 'react-native-ui-kitten'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import * as yup from 'yup'
import { FIREBASE_SIGNIN, FIREBASE_SIGNUP, getUser } from '../../utils/auth'
import Firebase from '../../utils/Firebase'
import { emailValidation, passwordValidation } from '../../utils/validationSchemas'

const PeopleIcon = style => <Icon {...style} name="people" />
const LoginIcon = style => <Icon {...style} name="log-in" />

const MAIN_SCREEN = 'Current'

const validationSchema = yup.object().shape({
    email: emailValidation,
    password: passwordValidation,
})

interface IUser {
    email: string
    password: string
}

interface Props {
    navigation: NavigationStackScreenProps<{
        navigate: any
    }>
}

const AuthScreen: React.FC<Props> = props => {
    const [user, setUser] = useState<IUser>({ email: '', password: '' })
    const [isSignup, setIsSignup] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [secureTextEntry, setSecureTextEntry] = useState(true)

    useEffect(() => {
        Firebase.auth().onAuthStateChanged(user => {
            if (user) {
                const userData = getUser(user.uid)
                console.log('userData FOUND', userData)

                if (userData !== null) {
                    props.navigation.navigate('Home')
                }
            } else {
                console.log('userData NOT FOUND')
            }
        })
    }, [])

    useEffect(() => {
        if (error) {
            Alert.alert('Error!', error, [{ text: 'Okay' }])
        }
    }, [error])

    const handleAuth = async ({ email, password }: IUser, actions) => {
        setUser({ email, password })
        actions.setSubmitting(true)

        setError(null)
        setIsLoading(true)
        // let res //: Response | void
        try {
            if (isSignup) {
                // res = await SIGN_UP(email, password)
                await FIREBASE_SIGNUP(email, password)
            } else {
                // res = await SIGN_IN(email, password)
                await FIREBASE_SIGNIN(email, password)
            }
            props.navigation.navigate(MAIN_SCREEN)
        } catch (e) {
            setError(e.message)
            setIsLoading(false)
        }
        await actions.setSubmitting(false)
    }

    const onIconPress = () => {
        setSecureTextEntry(!secureTextEntry)
    }

    const renderIcon = style => <Icon {...style} name={secureTextEntry ? 'eye-off' : 'eye'} />

    return (
        <Layout style={styles.screen}>
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50}>
                <ScrollView>
                    <Formik
                        initialValues={user}
                        validationSchema={validationSchema}
                        onSubmit={(values: IUser, actions: FormikActions<IUser>) => {
                            handleAuth(values, actions)
                        }}
                    >
                        {({
                            handleChange,
                            handleBlur,
                            values,
                            dirty,
                            isSubmitting,
                            handleSubmit,
                            errors,
                            isValid,
                            touched,
                            setFieldTouched,
                        }) => (
                            <Layout style={styles.container}>
                                <Text category={'h3'}>{isSignup ? 'Sign Up' : 'Login'}</Text>

                                <Input
                                    icon={PeopleIcon}
                                    style={styles.input}
                                    label="Email"
                                    disabled={false}
                                    placeholder="Email"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    returnKeyType="next"
                                    onChangeText={handleChange('email')}
                                    // onBlur={handleBlur('email')}
                                    onBlur={() => setFieldTouched('email')}
                                    value={values.email}
                                />
                                {touched.email && errors.email && (
                                    <Text style={styles.error}>{errors.email}</Text>
                                )}

                                <Input
                                    icon={renderIcon}
                                    secureTextEntry={secureTextEntry}
                                    onIconPress={onIconPress}
                                    style={styles.input}
                                    label="Password"
                                    disabled={false}
                                    placeholder="Password"
                                    keyboardType="default"
                                    autoCapitalize="none"
                                    minLength={5}
                                    maxLength={25}
                                    errorMessage="Enter valid password"
                                    returnKeyType="next"
                                    onChangeText={handleChange('password')}
                                    // onBlur={handleBlur('password')}
                                    onBlur={() => setFieldTouched('password')}
                                    value={values.password}
                                />
                                {touched.password && errors.password && (
                                    <Text style={styles.error}>{errors.password}</Text>
                                )}

                                <Layout style={styles.buttonsContainer}>
                                    <Layout style={styles.buttonContainer}>
                                        {isLoading ? (
                                            <Spinner status="primary" size="medium" />
                                        ) : (
                                            <Button
                                                icon={LoginIcon}
                                                style={styles.button}
                                                status="primary"
                                                onPress={handleSubmit}
                                                title={isSignup ? 'Sign Up' : 'Login'}
                                                disabled={!isValid || !dirty || isSubmitting}
                                            >
                                                {isSignup ? 'Sign Up' : 'Login'}
                                            </Button>
                                        )}
                                    </Layout>

                                    <Layout style={styles.buttonContainer}>
                                        <Button
                                            style={styles.button}
                                            appearance="outline"
                                            status="info"
                                            onPress={() => {
                                                setIsSignup(!isSignup)
                                            }}
                                            title={!isSignup ? 'Sign Up' : 'Login'}
                                            disabled={isSubmitting}
                                        >
                                            {!isSignup ? 'Sign Up' : 'Login'}
                                        </Button>
                                    </Layout>
                                </Layout>

                                {isLoading && <Spinner status="primary" size="giant" />}
                            </Layout>
                        )}
                    </Formik>
                </ScrollView>
            </KeyboardAvoidingView>
        </Layout>
    )
}

// AuthScreen.navigationOptions = {
//     headerTitle: 'Authenticate',
// }

const styles = StyleSheet.create({
    screen: {
        width: '100%',
        height: '100%',
        padding: 8,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // width: '80%',
        // maxWidth: 400,
        // maxHeight: 600,
        padding: 16,
    },
    input: {
        flex: 1,
        marginHorizontal: 4,
        marginVertical: 4,
    },
    button: {
        marginHorizontal: 4,
        marginVertical: 4,
    },
    buttonsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 8,
    },
    error: {
        textAlign: 'center',
        fontSize: 10,
        color: 'red',
    },
})

export default AuthScreen
