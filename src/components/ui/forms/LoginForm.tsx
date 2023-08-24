import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormValuesLogin } from '../../../interfaces/loginForm';
import ErrorMsg from './ErrorMsg';
import { Link } from 'react-router-dom';
import { useDanone } from '../../../hooks/useDanone';
import { useState } from 'react';
import { ProgressButton } from '../progress/ProgressButton';
import { ModalResetPassword } from '../modals/ModalResetPassword';
import { ResetPasswordContent } from '../../login/ResetPasswordContent';

export const LoginForm = () => {
  const { login } = useDanone();
  const [loader, setLoader] = useState(false);

  const initialValues: FormValuesLogin = {
    email: '',
    password: '',
  };

  const loginSchema = Yup.object({
    email: Yup.string()
      .required('El correo es obligatorio')
      .email()
      .label('Correo'),
    password: Yup.string()
      .required('La contraseña es obligatoria')
      .min(6, 'Ingresa mínimo 6 caracteres')
      .label('Contraseña'),
  });

  const { handleChange, handleSubmit, handleBlur, errors, values, touched } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: async ({ email, password }) => {
        setLoader(true);
        const userBody: FormValuesLogin = {
          email: email,
          password: password,
        };
        await login(userBody);
        setLoader(false);
      },
    });

  return (
    <>
      <form onSubmit={handleSubmit} className='form-login'>
        <div className='mb-30'>
          <label htmlFor='email'>CORREO ELECTRÓNICO</label>
          <input
            className='input-login'
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            id='email'
            name='email'
            type='text'
            placeholder='Ingresa tu correo'
          />
          {touched.email && <ErrorMsg error={errors.email || ''} />}
        </div>
        <div>
          <label htmlFor='password'>CONTRASEÑA</label>
          <input
            className='input-login'
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            id='password'
            name='password'
            type='password'
            placeholder='Ingresa tu contraseña'
          />
          {touched.password && <ErrorMsg error={errors.password || ''} />}
        </div>
        <p
          className='reset-password'
          data-bs-toggle='modal'
          data-bs-target='#modalResetPassword'
          style={{ cursor: 'pointer' }}
        >
          OLVIDÉ MI CONTRASEÑA
        </p>
        <div className=''>
          {loader ? (
            <ProgressButton />
          ) : (
            <>
              <button
                className='btn-primary-lg fw-bold'
                type='submit'
                aria-label='Iniciar sesión'
              >
                ENTRAR
              </button>
              <Link className='link' to={'/registro'}>
                REGISTRARSE
              </Link>
            </>
          )}
        </div>
      </form>
      <ModalResetPassword idModal={'modalResetPassword'}>
        <>
          <ResetPasswordContent />
        </>
      </ModalResetPassword>
    </>
  );
};
