import { useFormik } from 'formik';
import ErrorMsg from './ErrorMsg';
import { Link } from 'react-router-dom';
import { useDanone } from '../../../hooks/useDanone';
import { RegisterUser } from '../../../interfaces/RegisterUser';
import { useRef, useState } from 'react';
import { ProgressButton } from '../progress/ProgressButton';
import { initialValues, loginSchema } from './registerFormConfig';
import {
  Options,
  nationalityData,
  specialtyFalse,
  specialtyTrue,
  workAreaOptions,
} from './data';
import { MenuLenguages } from '../menu/MenuLenguages';
import { Cookie } from '../../cookies/Cookie';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RegisterForm = ({ setOpen, open }: Props) => {
  const { register } = useDanone();
  const termsInputEsp = useRef<HTMLInputElement | null>(null);

  const [specialityState, setSpecialityState] = useState(0);
  const [loader, setLoader] = useState(false);
  const [specialityData, setSpecialityData] = useState<Options[]>([
    { value: '', label: 'Selecciona una opción' },
  ]);

  const { handleChange, handleSubmit, handleBlur, errors, values, touched } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: async (values, { resetForm }) => {
        setLoader(true);
        const specialityTxt =
          values.specialty != 'Otro' ? values.specialty : values.other;
        const workAreaTxt =
          values.workArea != 'Otro' ? values.workArea : values.otherWorkArea;

        const user: RegisterUser = {
          nombre: values.name,
          apellidos: values.lastName,
          institucion: values.sendingInstitution,
          nacionalidad: values.nationality,
          edad: values.age,
          email: values.email,
          password: values.password,
          profesional: values.healthProfessional === 'Si' ? true : false,
          especialidad: specialityTxt,
          area_trabajo: workAreaTxt,
          asistido: values.edition,
          idioma: 1,
        };
        const { resp }: any = await register(user);

        if (resp) resetForm();
        setLoader(false);
      },
    });

  const handleHealthProfessionalChange = (event: any) => {
    values.specialty = '';
    const value = event.target.value;
    if (value === 'Si') {
      setSpecialityState(1);
      setSpecialityData(specialtyTrue);
    } else {
      setSpecialityState(1);
      setSpecialityData(specialtyFalse);
    }

    handleChange(event);
  };

  const handleSpecialityChange = (event: any) => {
    const value = event.target.value;
    if (value === 'Otro') {
      values.workArea = '';
      setSpecialityState(2);
    } else {
      values.workArea = '';
      values.other = '';
      setSpecialityState(3);
    }

    handleChange(event);
  };

  const handleOtherChange = (event: any) => {
    const value = event.target.value;
    if (value !== '') {
      setSpecialityState(3);
    } else {
      values.other = '';
    }

    handleChange(event);
  };

  const handleWorkAreaChange = (event: any) => {
    const value = event.target.value;
    if (value === 'Otro') {
      setSpecialityState(4);
    } else {
      values.otherWorkArea = '';
      setSpecialityState(3);
    }

    handleChange(event);
  };

  const handleClickTerm = () => {
    if (termsInputEsp.current) {
      termsInputEsp.current.checked = true;
    }

    values.termsAndConditions = true;
  };

  return (
    <>
      <form onSubmit={handleSubmit} className='form-register mt-50 mb-50'>
        <div className='mb-30'>
          <div className='row mx-0 mb-15 p-0'>
            <div className='col-12'>
              <MenuLenguages
                urlEnglish='/register'
                urlSpanish='/registro'
                lenguage='esp'
              />
              <p className='note'>
                Nota: Te recomendamos registrate con tu nombre completo ya que
                así se expedirán las constancias al término del evento.
              </p>
            </div>
            <div className='col-xxl-6 col-xl-6 col-lg-6 col-md-6 '>
              <label htmlFor='name'>
                NOMBRE<span>*</span>
              </label>
              <input
                className='input-login'
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                id='name'
                name='name'
                type='text'
                placeholder='Ingresa tu nombre'
              />
              {touched.name && <ErrorMsg error={errors.name || ''} />}
            </div>
            <div className='col-xxl-6 col-xl-6 col-lg-6 col-md-6 '>
              <label htmlFor='lastName'>
                APELLIDOS<span>*</span>
              </label>
              <input
                className='input-login'
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                id='lastName'
                name='lastName'
                type='text'
                placeholder='Ingresa tus apellidos'
              />
              {touched.lastName && <ErrorMsg error={errors.lastName || ''} />}
            </div>
          </div>

          <div className='row mx-0 mb-15 p-0'>
            <div className='col-xxl-6 col-xl-6 col-lg-6 col-md-6 '>
              <label htmlFor='sendingInstitution'>
                INSTITUCIÓN DE PROCEDENCIA<span>*</span>
              </label>
              <input
                className='input-login'
                value={values.sendingInstitution}
                onChange={handleChange}
                onBlur={handleBlur}
                id='sendingInstitution'
                name='sendingInstitution'
                type='text'
                placeholder='Institución'
              />
              {touched.sendingInstitution && (
                <ErrorMsg error={errors.sendingInstitution || ''} />
              )}
            </div>
            <div className='col-xxl-6 col-xl-6 col-lg-6 col-md-6 '>
              <label htmlFor='nationality'>
                NACIONALIDAD<span>*</span>
              </label>
              <select
                className='input-login'
                value={values.nationality}
                onChange={handleChange}
                onBlur={handleBlur}
                id='nationality'
                name='nationality'
              >
                {nationalityData.map(({ label, value }, i) => (
                  <option key={i} value={value}>
                    {label}
                  </option>
                ))}
              </select>

              {touched.nationality && (
                <ErrorMsg error={errors.nationality || ''} />
              )}
            </div>
          </div>

          <div className='row mx-0 mb-15 p-0'>
            <div className='col-xxl-4 col-xl-4 col-lg-4 col-md-4 '>
              <label htmlFor='age'>
                EDAD<span>*</span>
              </label>
              <input
                className='input-login'
                value={values.age !== 0 ? values.age : ''}
                onChange={handleChange}
                onBlur={handleBlur}
                id='age'
                name='age'
                type='text'
                placeholder='Introduce tu edad'
              />
              {touched.age && <ErrorMsg error={errors.age || ''} />}
            </div>
            <div className='col-xxl-4 col-xl-4 col-lg-4 col-md-4 '>
              <label htmlFor='email'>
                EMAIL<span>*</span>
              </label>
              <input
                className='input-login'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                id='email'
                name='email'
                type='text'
                placeholder='Introduce tu mail'
              />
              {touched.email && <ErrorMsg error={errors.email || ''} />}
            </div>
            <div className='col-xxl-4 col-xl-4 col-lg-4 col-md-4 '>
              <label htmlFor='confirmEmail'>
                CONFIRMA EMAIL<span>*</span>
              </label>
              <input
                className='input-login'
                value={values.confirmEmail}
                onChange={handleChange}
                onBlur={handleBlur}
                id='confirmEmail'
                name='confirmEmail'
                type='text'
                placeholder='Confirma tu mail'
              />
              {touched.confirmEmail && (
                <ErrorMsg error={errors.confirmEmail || ''} />
              )}
            </div>
          </div>

          <div className='row mx-0 mb-15 p-0'>
            <div className='col-xxl-4 col-xl-4 col-lg-4 col-md-4 '>
              <label htmlFor='password'>
                CONTRASEÑA<span>*</span>
              </label>
              <input
                className='input-login'
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                id='password'
                name='password'
                type='password'
                placeholder='Introduce tu contraseña'
              />
              {touched.password && <ErrorMsg error={errors.password || ''} />}
            </div>
            <div className='col-xxl-4 col-xl-4 col-lg-4 col-md-4 '>
              <label htmlFor='confirmPassword'>
                CONFIRMA CONTRASEÑA<span>*</span>
              </label>
              <input
                className='input-login'
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                id='confirmPassword'
                name='confirmPassword'
                type='password'
                placeholder='Confirma tu contraseña'
              />
              {touched.confirmPassword && (
                <ErrorMsg error={errors.confirmPassword || ''} />
              )}
            </div>
            <div className='col-xxl-4 col-xl-4 col-lg-4 col-md-4 '>
              <p className='title-input'>
                ¿ERES PROFESIONAL DE LA SALUD?<span>*</span>
              </p>
              <div>
                <input
                  type='radio'
                  className='btn-check'
                  value='Si'
                  onChange={handleHealthProfessionalChange}
                  onBlur={handleBlur}
                  id='healthProfessional'
                  name='healthProfessional'
                  autoComplete='off'
                />
                <label
                  className='btn btn-outline-primary btn-radio'
                  htmlFor='healthProfessional'
                ></label>
                <label className='label' htmlFor='healthProfessional'>
                  Sí
                </label>

                <input
                  type='radio'
                  className='btn-check'
                  value='No'
                  onChange={handleHealthProfessionalChange}
                  onBlur={handleBlur}
                  id='healthProfessional2'
                  name='healthProfessional'
                  autoComplete='off'
                />
                <label
                  className='btn btn-outline-primary btn-radio'
                  htmlFor='healthProfessional2'
                ></label>
                <label className='label' htmlFor='healthProfessional2'>
                  No
                </label>
              </div>

              {touched.healthProfessional && (
                <ErrorMsg error={errors.healthProfessional || ''} />
              )}
            </div>
          </div>

          <div className='row mx-0 mb-15 p-0'>
            {specialityState >= 1 && (
              <div className='col-xxl-4 col-xl-4 col-lg-4 col-md-4 '>
                <label htmlFor='specialty'>
                  Especialidad<span>*</span>
                </label>
                <select
                  className='input-login'
                  value={values.specialty}
                  onChange={handleSpecialityChange}
                  onBlur={handleBlur}
                  id='specialty'
                  name='specialty'
                >
                  {specialityData.map(({ label, value }, i) => (
                    <option key={i} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
                {touched.specialty && (
                  <ErrorMsg error={errors.specialty || ''} />
                )}
              </div>
            )}

            {specialityState >= 2 && values.specialty === 'Otro' && (
              <div className='col-xxl-4 col-xl-4 col-lg-4 col-md-4 '>
                <label htmlFor='other'>
                  Otra especialidad<span>*</span>
                </label>
                <input
                  className='input-login'
                  value={values.other}
                  onChange={handleOtherChange}
                  onBlur={handleBlur}
                  id='other'
                  name='other'
                  type='text'
                  placeholder='Introduce tu especialidad'
                />
                {touched.other && <ErrorMsg error={errors.other || ''} />}
              </div>
            )}

            {specialityState >= 3 && (
              <div className='col-xxl-4 col-xl-4 col-lg-4 col-md-4 '>
                <label htmlFor='specialty'>
                  Área de trabajo<span>*</span>
                </label>
                <select
                  className='input-login'
                  value={values.workArea}
                  onChange={handleWorkAreaChange}
                  onBlur={handleBlur}
                  id='workArea'
                  name='workArea'
                >
                  {workAreaOptions.map(({ label, value }, i) => (
                    <option key={i} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
                {touched.workArea && <ErrorMsg error={errors.workArea || ''} />}
              </div>
            )}
            {specialityState === 4 && (
              <div className='col-xxl-4 col-xl-4 col-lg-4 col-md-4 '>
                <label htmlFor='otherWorkArea'>
                  Otra área de trabajo<span>*</span>
                </label>
                <input
                  className='input-login'
                  value={values.otherWorkArea}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id='otherWorkArea'
                  name='otherWorkArea'
                  type='text'
                  placeholder='Introduce tu área de trabajo'
                />
                {touched.otherWorkArea && (
                  <ErrorMsg error={errors.otherWorkArea || ''} />
                )}
              </div>
            )}
          </div>

          <div className='row mx-0 mb-15 p-0'>
            <div className='col-12'>
              <p className='title-input'>
                ¿HAS ASISTIDO A ALGUNA EDICIÓN DE NUTRITION FORUM? ESPECIFICA:
                <span>*</span>
              </p>
              <div>
                <input
                  type='checkbox'
                  className='btn-check'
                  value='2019'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id='edition2019'
                  name='edition'
                  autoComplete='off'
                />
                <label
                  className='btn btn-outline-primary btn-checkbox'
                  htmlFor='edition2019'
                ></label>
                <label className='label' htmlFor='edition2019'>
                  2019
                </label>

                <input
                  type='checkbox'
                  className='btn-check'
                  value='2020'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id='edition2020'
                  name='edition'
                  autoComplete='off'
                />
                <label
                  className='btn btn-outline-primary btn-checkbox'
                  htmlFor='edition2020'
                ></label>
                <label className='label' htmlFor='edition2020'>
                  2020
                </label>

                <input
                  type='checkbox'
                  className='btn-check'
                  value='2021'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id='edition2021'
                  name='edition'
                  autoComplete='off'
                />
                <label
                  className='btn btn-outline-primary btn-checkbox'
                  htmlFor='edition2021'
                ></label>
                <label className='label' htmlFor='edition2021'>
                  2021
                </label>

                <input
                  type='checkbox'
                  className='btn-check'
                  value='2022'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id='edition2022'
                  name='edition'
                  autoComplete='off'
                />
                <label
                  className='btn btn-outline-primary btn-checkbox'
                  htmlFor='edition2022'
                ></label>
                <label className='label' htmlFor='edition2022'>
                  2022
                </label>

                <input
                  type='checkbox'
                  className='btn-check'
                  value='No he asistido'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id='editionNotSelected'
                  name='edition'
                  autoComplete='off'
                />
                <label
                  className='btn btn-outline-primary btn-checkbox'
                  htmlFor='editionNotSelected'
                ></label>
                <label className='label' htmlFor='editionNotSelected'>
                  No he asistido
                </label>
              </div>
              {touched.edition && <ErrorMsg error={errors.edition || ''} />}
            </div>
          </div>

          <div className='row mx-0 mb-15 p-0'>
            <div className='col-12'>
              <div>
                <input
                  ref={termsInputEsp}
                  type='checkbox'
                  className='btn-check check-pink'
                  value={values.termsAndConditions.toString()}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id='termsAndConditions'
                  name='termsAndConditions'
                  autoComplete='off'
                />
                <label
                  className='btn btn-outline-primary btn-checkbox-pink'
                  htmlFor='termsAndConditions'
                ></label>
                <label className='label note' htmlFor='termsAndConditions'>
                  Acepto los{' '}
                  <a
                    className='fw-bold text-decoration-underline'
                    target='_blank'
                    href='https://danone.mediaserviceagency.com/TE%CC%81RMINOS%20Y%20CONDICIONES%20INSTITUTO%20DANONE.pdf'
                  >
                    Términos y Condiciones
                  </a>
                  ,{' '}
                  <a
                    className='fw-bold text-decoration-underline'
                    target='_blank'
                    href='https://danone.mediaserviceagency.com/Aviso%20privacidad%20Integral.pdf'
                  >
                    Política de Privacidad
                  </a>{' '}
                  así como las{' '}
                  <button
                    type='button'
                    className='fw-bold text-decoration-underline'
                    onClick={() => setOpen(true)}
                  >
                    Cookies.
                  </button>
                </label>
              </div>
              {errors.termsAndConditions && (
                <ErrorMsg error={errors.termsAndConditions || ''} />
              )}
            </div>
          </div>
        </div>

        <div className='buttons'>
          {loader ? (
            <ProgressButton />
          ) : (
            <>
              <button
                className='btn-secondary-lg fw-bold'
                type='submit'
                aria-label='Iniciar sesión'
              >
                REGISTRAR
              </button>
              <Link className='link' to={'/iniciar-sesion'}>
                INICIAR SESIÓN
              </Link>
            </>
          )}
        </div>
      </form>
      <Cookie
        lenguage='esp'
        setCheck={handleClickTerm}
        setOpen={setOpen}
        open={open}
      />
    </>
  );
};
