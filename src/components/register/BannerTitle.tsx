import Logo from '../../assets/img/register/logo-registro.svg';
import Title from '../../assets/img/register/title-registro.svg';

export const BannerTitle = () => {
  return (
    <div className='w-100 d-flex align-items-center justify-content-center flex-column banner-title'>
      <img
        className='img-fluid logo'
        src={Logo}
        alt='danone'
      />
      <img
        className='img-fluid title'
        src={Title}
        alt='danone'
      />
    </div>
  );
};
