import { useFormik } from 'formik';
import ErrorMsg from './ErrorMsg';
import { Link } from 'react-router-dom';
import { useDanone } from '../../../hooks/useDanone';
import { RegisterUser } from '../../../interfaces/RegisterUser';
import { useRef, useState } from 'react';
import { ProgressButton } from '../progress/ProgressButton';
import { initialValues, loginSchema } from './registerFormConfigIng';
import {
  Options,
  nationalityData,
  specialtyFalse,
  specialtyTrue,
  workAreaOptions,
} from './dataIng';
import { MenuLenguages } from '../menu/MenuLenguages';
import { Cookie } from '../../cookies/Cookie';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RegisterFormIng = ({ setOpen, open }: Props) => {
  const { register } = useDanone();
  const termsInput = useRef<HTMLInputElement | null>(null);

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
          idioma: 2,
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
    if (termsInput.current) {
      termsInput.current.checked = true;
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
                lenguage='ing'
              />
              <p className='note'>
                Note: We recommend that you register with your full name, as
                this will be used to issue certificates at the end of the event.
              </p>
            </div>
            <div className='col-xxl-6 col-xl-6 col-lg-6 col-md-6 '>
              <label htmlFor='name'>
                NAME<span>*</span>
              </label>
              <input
                className='input-login'
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                id='name'
                name='name'
                type='text'
                placeholder='Enter your name'
              />
              {touched.name && <ErrorMsg error={errors.name || ''} />}
            </div>
            <div className='col-xxl-6 col-xl-6 col-lg-6 col-md-6 '>
              <label htmlFor='lastName'>
                LAST NAMES<span>*</span>
              </label>
              <input
                className='input-login'
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                id='lastName'
                name='lastName'
                type='text'
                placeholder='Enter your last names'
              />
              {touched.lastName && <ErrorMsg error={errors.lastName || ''} />}
            </div>
          </div>

          <div className='row mx-0 mb-15 p-0'>
            <div className='col-xxl-6 col-xl-6 col-lg-6 col-md-6 '>
              <label htmlFor='sendingInstitution'>
                SENDING INSTITUTION<span>*</span>
              </label>
              <input
                className='input-login'
                value={values.sendingInstitution}
                onChange={handleChange}
                onBlur={handleBlur}
                id='sendingInstitution'
                name='sendingInstitution'
                type='text'
                placeholder='Institution'
              />
              {touched.sendingInstitution && (
                <ErrorMsg error={errors.sendingInstitution || ''} />
              )}
            </div>
            <div className='col-xxl-6 col-xl-6 col-lg-6 col-md-6 '>
              <label htmlFor='nationality'>
                NATIONALITY<span>*</span>
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
                AGE<span>*</span>
              </label>
              <input
                className='input-login'
                value={values.age !== 0 ? values.age : ''}
                onChange={handleChange}
                onBlur={handleBlur}
                id='age'
                name='age'
                type='text'
                placeholder='Enter your age'
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
                placeholder='Enter your email'
              />
              {touched.email && <ErrorMsg error={errors.email || ''} />}
            </div>
            <div className='col-xxl-4 col-xl-4 col-lg-4 col-md-4 '>
              <label htmlFor='confirmEmail'>
                CONFIRM EMAIL<span>*</span>
              </label>
              <input
                className='input-login'
                value={values.confirmEmail}
                onChange={handleChange}
                onBlur={handleBlur}
                id='confirmEmail'
                name='confirmEmail'
                type='text'
                placeholder='Confirm your email'
              />
              {touched.confirmEmail && (
                <ErrorMsg error={errors.confirmEmail || ''} />
              )}
            </div>
          </div>

          <div className='row mx-0 mb-15 p-0'>
            <div className='col-xxl-4 col-xl-4 col-lg-4 col-md-4 '>
              <label htmlFor='password'>
                PASSWORD<span>*</span>
              </label>
              <input
                className='input-login'
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                id='password'
                name='password'
                type='password'
                placeholder='Enter your password'
              />
              {touched.password && <ErrorMsg error={errors.password || ''} />}
            </div>
            <div className='col-xxl-4 col-xl-4 col-lg-4 col-md-4 '>
              <label htmlFor='confirmPassword'>
                CONFIRM PASSWORD<span>*</span>
              </label>
              <input
                className='input-login'
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                id='confirmPassword'
                name='confirmPassword'
                type='password'
                placeholder='Confirm your password'
              />
              {touched.confirmPassword && (
                <ErrorMsg error={errors.confirmPassword || ''} />
              )}
            </div>
            <div className='col-xxl-4 col-xl-4 col-lg-4 col-md-4 '>
              <p className='title-input'>
                ARE YOU A HEALTH PROFESSIONAL?<span>*</span>
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
                  Yes
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
                  Specialty<span>*</span>
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
                  Other specialty<span>*</span>
                </label>
                <input
                  className='input-login'
                  value={values.other}
                  onChange={handleOtherChange}
                  onBlur={handleBlur}
                  id='other'
                  name='other'
                  type='text'
                  placeholder='Enter your specialty'
                />
                {touched.other && <ErrorMsg error={errors.other || ''} />}
              </div>
            )}

            {specialityState >= 3 && (
              <div className='col-xxl-4 col-xl-4 col-lg-4 col-md-4 '>
                <label htmlFor='specialty'>
                  Work area<span>*</span>
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
                  Other work area<span>*</span>
                </label>
                <input
                  className='input-login'
                  value={values.otherWorkArea}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id='otherWorkArea'
                  name='otherWorkArea'
                  type='text'
                  placeholder='Enter your work area'
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
                HAVE YOU ATTENDED ANY EDITION OF NUTRITION FORUM? SPECIFY:
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
                  I have not attended
                </label>
              </div>
              {touched.edition && <ErrorMsg error={errors.edition || ''} />}
            </div>
          </div>

          <div className='row mx-0 mb-15 p-0'>
            <div className='col-12'>
              <div>
                <input
                  ref={termsInput}
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
                  I accept the{' '}
                  <a
                    className='fw-bold text-decoration-underline'
                    target='_blank'
                    href='https://danone.mediaserviceagency.com/TE%CC%81RMINOS%20Y%20CONDICIONES%20INSTITUTO%20DANONE.pdf'
                  >
                    Terms and Conditions
                  </a>
                  ,{' '}
                  <a
                    className='fw-bold text-decoration-underline'
                    target='_blank'
                    href='https://danone.mediaserviceagency.com/Aviso%20privacidad%20Integral.pdf'
                  >
                    Privacy Policy
                  </a>{' '}
                  and{' '}
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
                REGISTER
              </button>
              <Link className='link' to={'/login'}>
                LOG IN
              </Link>
            </>
          )}
        </div>
      </form>
      <Cookie
        lenguage='ing'
        setCheck={handleClickTerm}
        setOpen={setOpen}
        open={open}
      />
    </>
  );
};
