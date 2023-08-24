import { useState } from 'react';
import { BannerTitle } from '../../components/register/BannerTitle';
import { Divider } from '../../components/register/Divider';
import { ImagesFloats } from '../../components/register/ImagesFloats';
import { RegisterForm } from '../../components/ui/forms/RegisterForm';
import { DrawerCookies } from '../../components/ui/configurationCookies/DrawerCookies';

export const RegisterArea = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <DrawerCookies />
      <section className='section__register d-flex align-items-center justify-content-center'>
        <div className='row m-0 p-0 h-100 d-flex align-items-center justify-content-center'>
          <div className='col-xxl-4 col-xl-4 col-lg-4 m-0 p-0 h-100 d-flex align-items-center'>
            <BannerTitle />
          </div>
          <div className='col-xxl-1 col-xl-1 col-lg-1 m-0 p-0 h-100 d-flex align-items-lg-center justify-content-center'>
            <Divider />
          </div>
          <div className='col-xxl-7 col-xl-7 col-lg-7 m-0 p-0 h-100 d-flex align-items-lg-center justify-content-center'>
            <RegisterForm setOpen={setOpen} open={open} />
          </div>
        </div>
        <ImagesFloats />
      </section>
    </>
  );
};
