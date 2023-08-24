import useMediaQuery from '@mui/material/useMediaQuery';
import { BannerLoggin } from '../../components/ui/banners/BannerLoggin';
import { LoginForm } from '../../components/ui/forms/LoginForm';
import Logo from '../../assets/img/login/logo-nutricion.png';
import { MenuLenguages } from '../../components/ui/menu/MenuLenguages';
import { DrawerCookies } from '../../components/ui/configurationCookies/DrawerCookies';

export const LoginArea = () => {
  const movilIpadaScreen = useMediaQuery('(max-width:1000px)');

  return (
    <>
      <section className='section__login'>
        <div className='row m-0 p-0 h-100'>
          <div className='col-xxl-5 col-xl-5 col-lg-5 m-0 p-0 d-flex align-items-lg-center justify-content-center'>
            <div className='container-login'>
              <MenuLenguages
                urlEnglish='/login'
                urlSpanish='/iniciar-sesion'
                lenguage='esp'
              />
              {movilIpadaScreen && (
                <div className='mb-40 d-flex align-items-center justify-content-center'>
                  <img
                    className='img-fluid'
                    style={{ width: '50vw' }}
                    src={Logo}
                    alt='danone'
                  />
                </div>
              )}
              <div className='content-title'>
                <h2>BIENVENIDO</h2>
                <p>Por favor ingresa tus datos</p>
              </div>
              <LoginForm />
            </div>
          </div>
          <div className='col-xxl-7 col-xl-7 col-lg-7 m-0 p-0'>
            <BannerLoggin />
          </div>
        </div>
      </section>
      <DrawerCookies />
    </>
  );
};
