import * as yup from 'yup'

export const currencyValidation = yup.string().matches(/^\$?(\d{1,3})(\,?\d{3})*\.?\d{0,2}$/)

// export const amountValidation = yup.number().moreThan(0, 'Enter valid amount.')
export const amountValidation = yup.string().matches(/(\d)*\.?\d{0,2}/, 'Enter valid amount')

export const usernameValidation = yup
  .string()
  .min(3, 'Username must be at least 3 characters long.')
  .max(25, 'Username must be max. 25 characters.')
  .matches(/^[a-zA-Z]/, 'Username must start with a letter.')
  .required('Username is required.')

export const emailValidation = yup
  .string()
  .email('Invalid email.')
  .required('Email is required.')

export const minLength: number = 6
export const maxLength: number = 25

export const passwordValidation = yup
  .string()
  .min(minLength, `Password must be at least ${minLength} characters long.`)
  .max(maxLength, `Password must be max. ${maxLength} characters.`)
  // .matches(
  //     /^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{10,}$/,
  //     'Must Contain 10 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
  // )
  .required('Password is required.')

export const confirmPasswordValidation = yup
  .string()
  .oneOf([yup.ref('password'), null], 'Passwords must match.')
  .required('Confirm Password is required.')
