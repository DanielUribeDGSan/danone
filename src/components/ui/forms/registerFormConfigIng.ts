import * as Yup from 'yup';
import { FormValuesRegister } from '../../../interfaces/registerForm';

export const initialValues: FormValuesRegister = {
  name: '',
  lastName: '',
  sendingInstitution: '',
  nationality: '',
  age: '',
  email: '',
  confirmEmail: '',
  password: '',
  confirmPassword: '',
  healthProfessional: '',
  specialty: '',
  other: '',
  workArea: '',
  otherWorkArea: '',
  edition: [],
  idioma: 2,
  termsAndConditions: false,
};

export const loginSchema = Yup.object({
  name: Yup.string()
    .matches(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/,
      'Only letters are allowed in the name'
    )
    .required('The name is required')
    .label('Name'),
  lastName: Yup.string()
    .matches(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/,
      'Only letters are allowed in last names'
    )
    .required('Last names are required')
    .label('Last names'),
  sendingInstitution: Yup.string()
    .required('The Institution is mandatory')
    .label('Institution of origin'),
  nationality: Yup.string()
    .matches(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/,
      'Only letters are allowed in the nationality'
    )
    .required('Nationality is mandatory')
    .label('Nationality'),
  age: Yup.number()
    .min(18, 'Age must be 18 or older')
    .typeError('Age must be a number')
    .required('Age is mandatory')
    .label('Age'),
  email: Yup.string()
    .required('Email is required')
    .email('You must enter a valid email address')
    .label('Email'),
  confirmEmail: Yup.string()
    .required('Confirm your email')
    .oneOf([Yup.ref('email'), ''], 'Emails do not match'),
  password: Yup.string()
    .required('Password is mandatory')
    .min(6, 'Enter minimum 6 characters')
    .label('Password'),
  confirmPassword: Yup.string()
    .required('Confirm your password')
    .oneOf([Yup.ref('password'), ''], 'Passwords do not match'),
  healthProfessional: Yup.string()
    .oneOf(['Si', 'No'])
    .required('You must select an option'),
  specialty: Yup.string().when('healthProfessional', (value) =>
    value[0] === 'Si'
      ? Yup.string().required('Specialty is required').label('Specialty')
      : Yup.string().required('Specialty is required').label('Specialty')
  ),
  other: Yup.string().when('specialty', (value) =>
    value[0] === 'Otro'
      ? Yup.string().required('Specialty is required').label('Specialty')
      : Yup.string().notRequired().label('Specialty')
  ),
  workArea: Yup.string().when('specialty', (value) =>
    value[0] === 'Otro'
      ? Yup.string().required('The work area is required').label('Specialty')
      : Yup.string().required('The work area is required').label('Specialty')
  ),
  otherWorkArea: Yup.string().when('workArea', (value) =>
    value[0] === 'Otro'
      ? Yup.string().required('The work area is required').label('Work area')
      : Yup.string().notRequired().label('Work area')
  ),
  edition: Yup.array()
    .of(Yup.string())
    .min(1, 'You must select at least one option'),
  termsAndConditions: Yup.bool().oneOf(
    [true],
    'You must accept the terms and conditions'
  ),
});
