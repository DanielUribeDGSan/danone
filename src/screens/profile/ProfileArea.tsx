import { ContentUser } from '../../components/profile/ContentUser';
import { HomeHeader } from '../../components/ui/headers/HomeHeader';
import { useUser } from '../../hooks/useUser';
import { useEffect, useState } from 'react';
import { CircleChar } from './CircleChar';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { useDanone } from '../../hooks/useDanone';
import { RotateHorizontalPhone } from '../../components/ui/rotatePhone/RotateHorizontalPhone';
import { VerifyInfo } from '../../components/profile/VerifyInfo';
import { useDispatch } from 'react-redux';
import { update_constancia_user } from '../../redux/features/auth-slice';

export const ProfileArea = () => {
  const dispatch = useDispatch();

  const { userData, isLoadingUser } = useUser();
  const [percentageP, setpercentageP] = useState(0);
  const [open, setOpen] = useState(false);
  const { removeBgImage } = useDanone();

  const [height, setHeight] = useState(0);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];

    removeBgImage(file, userData?.email, 'P');
  };

  useEffect(() => {
    let active = true;

    if (active && userData?.email) {
      if (userData?.constancia > 3) {
        const constanciaData = { constancia: 1 };
        dispatch(update_constancia_user(constanciaData));
      }
    }

    return () => {
      active = false;
    };
  }, [userData?.email]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const adjustSize = () => {
        setHeight(window.innerHeight);
      };

      window.addEventListener('resize', adjustSize);
      adjustSize();

      return () => {
        window.removeEventListener('resize', adjustSize);
      };
    }
  }, []);

  if (isLoadingUser) {
    return <p>Cargando...</p>;
  }

  return (
    <div className='section__user'>
      <div
        className='row p-0 m-0 w-100 d-flex align-items-center justify-content-center'
        style={{
          minHeight: height,
        }}
      >
        <div className='col-xxl-6 col-xl-6 col-lg-6 col-6 h-100 d-flex align-items-center justify-content-center'>
          <ContentUser user={userData} />
        </div>
        <div className='col-xxl-6 col-xl-6 col-lg-6 col-6 h-100 d-flex align-items-center justify-content-center flex-column'>
          <CircleChar
            user={userData}
            percentageP={percentageP}
            setpercentageP={setpercentageP}
          />

          {userData?.name && percentageP >= 80 && !userData?.constancia ? (
            <button
              className='btn-primary-lg constancia-btn'
              onClick={() => setOpen(!open)}
            >
              <SaveAltIcon />
              {userData?.idioma === 1
                ? 'descargar constancia'
                : 'download proof'}
            </button>
          ) : userData?.name &&
            percentageP >= 80 &&
            userData?.constancia <= 1 ? (
            <button
              className='btn-primary-lg constancia-btn'
              onClick={() => setOpen(!open)}
            >
              <SaveAltIcon />
              {userData?.idioma === 1
                ? 'descargar constancia'
                : 'download proof'}
            </button>
          ) : null}

          <label
            htmlFor='upload-input'
            className='image-label btn-primary-border-sm imagen-btn'
          >
            <span>
              {userData?.idioma === 1 ? 'Seleccionar imagen' : 'Select image'}
            </span>
          </label>
          <input
            id='upload-input'
            type='file'
            accept='image/*'
            onChange={handleFileChange}
            className='input-file'
          />
        </div>
        <RotateHorizontalPhone />
      </div>
      {!isLoadingUser && <HomeHeader user={userData} />}
      {userData?.name && (
        <VerifyInfo open={open} setOpen={setOpen} user={userData} />
      )}
    </div>
  );
};
