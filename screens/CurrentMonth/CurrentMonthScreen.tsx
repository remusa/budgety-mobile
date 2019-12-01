import { Formik, FormikActions } from 'formik'
import React, { useState } from 'react'
import { KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native'
import { Button, Datepicker, Icon, Input, Layout, Modal, Text } from 'react-native-ui-kitten'
import * as yup from 'yup'
import { amountValidation } from '../../utils/validationSchemas'
import TransactionsList from './TransactionsList'

const PlusIcon = style => <Icon {...style} name='plus-circle' />
const CheckmarkIcon = style => <Icon {...style} name='checkmark-circle-2' />
const CalendarIcon = style => <Icon {...style} name='calendar' />

export interface ITransaction {
  amount: string
  category: string
  note: string
  date: Date
}

interface Props {}

const CurrentMonthScreen: React.FC<Props> = props => {
  const [transactions, setTransactions] = useState<Array<ITransaction>>([
    {
      amount: '123.50',
      category: 'Food',
      note: 'Pizza',
      date: new Date(),
    },
  ])
  const [modalVisible, setModalVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const onSelectDate = date => {
    console.log('date', date)
  }

  const toggleModal = () => {
    setModalVisible(!modalVisible)
  }

  const validationSchema = yup.object().shape({
    amount: amountValidation,
  })

  const onSubmit = async ({ amount, category, note, date }: ITransaction, actions) => {
    actions.setSubmitting(true)

    setError(null)
    setIsLoading(true)
    try {
      await console.log(`SAVING: ${Object.values({ amount, category, note, date })}`)
      setTransactions(transactions.concat({ amount, category, note, date }))
    } catch (e) {
      setError(e.message)
      setIsLoading(false)
    }
    await actions.setSubmitting(false)
    await setIsLoading(true)
    await toggleModal()
  }

  const renderModalElement = () => {
    return (
      <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={50}>
        <ScrollView>
          <Formik
            initialValues={{
              amount: '123.00',
              category: 'Category 1',
              note: 'Test note',
              date: new Date(),
            }}
            validationSchema={validationSchema}
            onSubmit={(values: ITransaction, actions: FormikActions<ITransaction>) => {
              onSubmit(values, actions)
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
              <Layout level='3' style={styles.modalContainer}>
                <Text category='h3'>Add transaction</Text>

                <Input
                  style={styles.input}
                  label='Amount'
                  disabled={false}
                  placeholder='0.00'
                  keyboardType='decimal-pad'
                  autoCapitalize='none'
                  errorMessage='Enter valid amount'
                  returnKeyType='next'
                  onChangeText={handleChange('amount')}
                  onBlur={() => setFieldTouched('amount')}
                  value={values.amount}
                />
                {touched.amount && errors.amount && (
                  <Text style={styles.error}>{errors.amount}</Text>
                )}

                <Input
                  style={styles.input}
                  label='Category'
                  disabled={false}
                  placeholder='Select category'
                  keyboardType='default'
                  autoCapitalize='sentences'
                  maxLength={30}
                  errorMessage='Enter valid category'
                  returnKeyType='next'
                  onChangeText={handleChange('category')}
                  onBlur={() => setFieldTouched('category')}
                  value={values.category}
                />
                {touched.category && errors.category && (
                  <Text style={styles.error}>{errors.category}</Text>
                )}

                <Input
                  style={styles.input}
                  label='Note'
                  disabled={false}
                  placeholder='Enter details'
                  keyboardType='default'
                  autoCapitalize='sentences'
                  maxLength={30}
                  errorMessage='Enter valid note'
                  returnKeyType='next'
                  onChangeText={handleChange('note')}
                  onBlur={() => setFieldTouched('note')}
                  value={values.note}
                />
                {touched.note && errors.note && <Text style={styles.error}>{errors.note}</Text>}

                <Datepicker icon={CalendarIcon} date={values.date} onSelect={onSelectDate} />

                {/* {isLoading ? (
                  <Spinner status='primary' size='medium' />
                ) : ( */}
                <Button
                  icon={CheckmarkIcon}
                  status='success'
                  size='medium'
                  onPress={handleSubmit}
                  title='Save'
                  // disabled={!isValid || !dirty || isSubmitting}
                >
                  Save
                </Button>
                {/* )} */}
              </Layout>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }

  return (
    <Layout style={styles.container}>
      <Text category={'h1'}>Current month</Text>

      <Button icon={PlusIcon} onPress={toggleModal} status='success' size='large'>
        Add transaction
      </Button>

      <TransactionsList transactions={transactions} />

      <Modal
        allowBackdrop={true}
        backdropStyle={{ backgroundColor: 'black', opacity: 0.8 }}
        onBackdropPress={toggleModal}
        visible={modalVisible}
      >
        {renderModalElement()}
      </Modal>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    padding: 32,
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

export default CurrentMonthScreen
