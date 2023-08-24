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
  idioma: 1,
  termsAndConditions: false,
};

export const loginSchema = Yup.object({
  name: Yup.string()
    .matches(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/,
      'Solo se permiten letras en el nombre'
    )
    .required('El nombre es obligatorio')
    .label('Nombre'),
  lastName: Yup.string()
    .matches(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/,
      'Solo se permiten letras en los apellidos'
    )
    .required('Los apellidos son obligatorios')
    .label('Apellidos'),
  sendingInstitution: Yup.string()
    .required('La Institución es obligatoria')
    .label('Institución de procedencia'),
  nationality: Yup.string()
    .matches(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/,
      'Solo se permiten letras en la nacionalidad'
    )
    .required('La nacionalidad es obligatoria')
    .label('Nacionalidad'),
  age: Yup.number()
    .min(18, 'La edad debe ser mayor o igual a 18')
    .typeError('Edad debe ser un número')
    .required('La edad es obligatoria')
    .label('Edad'),
  email: Yup.string()
    .required('El email es obligatorio')
    .email('Debes ingresar un email Válido')
    .label('Email'),
  confirmEmail: Yup.string()
    .required('Confirma tu email')
    .oneOf([Yup.ref('email'), ''], 'Los emails no coinciden'),
  password: Yup.string()
    .required('La contraseña es obligatoria')
    .min(6, 'Ingresa mínimo 6 caracteres')
    .label('Contraseña'),
  confirmPassword: Yup.string()
    .required('Confirma tu contraseña')
    .oneOf([Yup.ref('password'), ''], 'Las contraseñas no coinciden'),
  healthProfessional: Yup.string()
    .oneOf(['Si', 'No'])
    .required('Debes seleccionar una opción'),
  specialty: Yup.string().when('healthProfessional', (value) =>
    value[0] === 'Si'
      ? Yup.string()
          .required('La especialidad es requerida')
          .label('Especialidad')
      : Yup.string()
          .required('La especialidad es requerida')
          .label('Especialidad')
  ),
  other: Yup.string().when('specialty', (value) =>
    value[0] === 'Otro'
      ? Yup.string()
          .required('La especialidad es requerida')
          .label('Especialidad')
      : Yup.string().notRequired().label('Especialidad')
  ),
  workArea: Yup.string().when('specialty', (value) =>
    value[0] === 'Otro'
      ? Yup.string()
          .required('La área de trabajo es requerida')
          .label('Especialidad')
      : Yup.string()
          .required('La área de trabajo es requerida')
          .label('Especialidad')
  ),
  otherWorkArea: Yup.string().when('workArea', (value) =>
    value[0] === 'Otro'
      ? Yup.string()
          .required('La área de trabajo es requerida')
          .label('Área de trabajo')
      : Yup.string().notRequired().label('Área de trabajo')
  ),
  edition: Yup.array()
    .of(Yup.string())
    .min(1, 'Debes seleccionar al menos una opción'),
  termsAndConditions: Yup.bool().oneOf(
    [true],
    'Debes aceptar los términos y condiciones'
  ),
});
