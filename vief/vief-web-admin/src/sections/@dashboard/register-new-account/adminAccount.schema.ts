import * as Yup from 'yup';

export const AddNewAccountSchema = Yup.object().shape({
  userType: Yup.string().required('country is required'),
  email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});
