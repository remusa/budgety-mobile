import * as yup from 'yup'

const usernameValidation = yup
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .max(25, 'Username must be max. 25 characters')
    .required('Username is required')

const emailValidation = yup
    .string()
    .email('Invalid email')
    .required('Email is required')

const minLength: number = 6
const maxLength: number = 25

const passwordValidation = yup
    .string()
    .min(minLength, `Password must be at least ${minLength} characters long`)
    .max(maxLength, `Password must be max. ${maxLength} characters`)
    // .matches(
    //     /^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{10,}$/,
    //     'Must Contain 10 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    // )
    .required('Password is required')

const confirmPasswordValidation = yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required')

export { usernameValidation, emailValidation, passwordValidation, confirmPasswordValidation }
