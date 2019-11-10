import { Formik, FormikActions } from 'formik'
import React, { useState } from 'react'
import { KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native'
import { Button, Datepicker, Icon, Input, Layout, Modal, Spinner, Text, TopNavigation } from 'react-native-ui-kitten'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import * as yup from 'yup'
import { FIREBASE_SIGNOUT } from './../../utils/auth'
import { amountValidation } from './../../utils/validationSchemas'

const ArrowLeftIcon = style => <Icon {...style} name="arrow-left" />
const ArrowRightIcon = style => <Icon {...style} name="arrow-right" />
const DashboardIcon = style => <Icon {...style} name="layout" />
const PlusIcon = style => <Icon {...style} name="plus-circle" />
const CheckmarkIcon = style => <Icon {...style} name="checkmark-circle-2" />
const CalendarIcon = style => <Icon {...style} name="calendar" />

interface Props {
    navigation: NavigationStackScreenProps<{
        navigate: any
    }>
}

interface ITransaction {
    amount: string
    category: string
    note: string
    date: Date
}

const HomeScreen: React.FC<Props> = props => {
    const [modalVisible, setModalVisible] = useState(false)
    const [transaction, setTransaction] = useState<ITransaction>({
        amount: '',
        category: '',
        note: '',
        date: new Date(),
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const onSelectDate = date => {
        console.log('date', date)
        setTransaction({ ...transaction, date })
    }

    const toggleModal = () => {
        setModalVisible(!modalVisible)
    }

    const validationSchema = yup.object().shape({
        amount: amountValidation,
    })

    const handleSave = async ({ amount, category, date }: ITransaction, actions) => {
        setTransaction({ amount, category, note, date })
        actions.setSubmitting(true)

        setError(null)
        setIsLoading(true)
        try {
            console.log(`SAVING: ${Object.entries(transaction)}`)
        } catch (e) {
            setError(e.message)
            setIsLoading(false)
        }
        await actions.setSubmitting(false)
        // toggleModal()
    }

    const renderModalElement = () => {
        return (
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50}>
                <ScrollView>
                    <Formik
                        initialValues={transaction}
                        validationSchema={validationSchema}
                        onSubmit={(values: ITransaction, actions: FormikActions<ITransaction>) => {
                            handleSave(values, actions)
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
                            <Layout level="3" style={styles.modalContainer}>
                                <Text category="h3">Add transaction</Text>

                                <Input
                                    style={styles.input}
                                    label="Amount"
                                    disabled={false}
                                    placeholder="0.00"
                                    keyboardType="decimal-pad"
                                    autoCapitalize="none"
                                    errorMessage="Enter valid amount"
                                    returnKeyType="next"
                                    onChangeText={handleChange('amount')}
                                    onBlur={() => setFieldTouched('amount')}
                                    value={values.amount}
                                />
                                {touched.amount && errors.amount && (
                                    <Text style={styles.error}>{errors.amount}</Text>
                                )}

                                <Input
                                    style={styles.input}
                                    label="Category"
                                    disabled={false}
                                    placeholder="Select category"
                                    keyboardType="default"
                                    autoCapitalize="sentences"
                                    maxLength={30}
                                    errorMessage="Enter valid category"
                                    returnKeyType="next"
                                    onChangeText={handleChange('category')}
                                    onBlur={() => setFieldTouched('category')}
                                    value={values.category}
                                />
                                {touched.category && errors.category && (
                                    <Text style={styles.error}>{errors.category}</Text>
                                )}

                                <Input
                                    style={styles.input}
                                    label="Note"
                                    disabled={false}
                                    placeholder="Enter details"
                                    keyboardType="default"
                                    autoCapitalize="sentences"
                                    maxLength={30}
                                    errorMessage="Enter valid note"
                                    returnKeyType="next"
                                    onChangeText={handleChange('note')}
                                    onBlur={() => setFieldTouched('note')}
                                    value={values.note}
                                />
                                {touched.note && errors.note && (
                                    <Text style={styles.error}>{errors.note}</Text>
                                )}

                                <Datepicker
                                    icon={CalendarIcon}
                                    date={transaction.date}
                                    onSelect={onSelectDate}
                                />

                                {isLoading ? (
                                    <Spinner status="primary" size="medium" />
                                ) : (
                                    <Button
                                        icon={CheckmarkIcon}
                                        status="success"
                                        size="medium"
                                        onPress={handleSubmit}
                                        title="Save"
                                        disabled={!isValid || !dirty || isSubmitting}
                                    >
                                        Save
                                    </Button>
                                )}
                            </Layout>
                        )}
                    </Formik>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }

    const handleLogout = () => {
        FIREBASE_SIGNOUT().then(() => {
            props.navigation.navigate('Auth')
        })
    }

    const navigate = () => {
        props.navigation.navigate('Settings')
    }

    return (
        <Layout style={styles.tabContent}>
            <Text category={'h1'}>Current month</Text>

            <Button icon={PlusIcon} onPress={toggleModal} status="success" size="large">
                Add transaction
            </Button>

            <Modal
                allowBackdrop={true}
                backdropStyle={{ backgroundColor: 'black', opacity: 0.8 }}
                onBackdropPress={toggleModal}
                visible={modalVisible}
            >
                {renderModalElement()}
            </Modal>

            <Button onPress={navigate}>Settings</Button>

            <Button onPress={handleLogout}>Logout</Button>
        </Layout>
    )
}

export const TopNavigationSimpleUsageShowcase = () => <TopNavigation title="Home" />

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        // padding: 16,
        // paddingBottom: 32,
    },
    tab: {},
    tabContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        // width: 200,
        // height: 200,
        minHeight: 400,
        padding: 16,
    },
    input: {
        flex: 1,
        marginHorizontal: 4,
        marginVertical: 4,
    },
    error: {
        textAlign: 'center',
        fontSize: 10,
        color: 'red',
    },
})

export default HomeScreen
