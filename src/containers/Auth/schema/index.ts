import * as yup from 'yup';

export const loginValidationSchema = yup.object().shape({
  // username: yup.string().required('Name is required'),
  email: yup.string().email('Please enter valid email').required('Email Address is Required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter'),
});

export const verifyEmailValidationSchema = yup.object().shape({
  code: yup.string().required('Verification code is Required'),
});
