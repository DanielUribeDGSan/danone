import { useEffect, useState } from 'react';
import 'animate.css';
import StandImage from '../../assets/img/stand/Danone_Stands.jpg';
import MarketImage from '../../assets/img/market/NF_Danone_Salida_.jpg';
import { Games } from '../../components/stand/Games';
import { HomeHeader } from '../../components/ui/headers/HomeHeader';
import { useUser } from '../../hooks/useUser';
import { Link } from 'react-router-dom';
import { LoaderImage } from '../../components/ui/loader/LoaderImage';
import { RotateHorizontalPhone } from '../../components/ui/rotatePhone/RotateHorizontalPhone';

export const StandArea = () => {
  const { userData, isLoadingUser } = useUser();
  const [show, setShow] = useState(true);
  const [imageClass, setImageClass] = useState(
    'img-fluid img-bg-stand animate__animated animate__fadeIn'
  );

  useEffect(() => {
    let active = true;

    if (active) {
      setTimeout(() => {
        setImageClass(
          'img-fluid img-bg-stand animate__animated animate__fadeOut'
        );
      }, 2000);
      setTimeout(() => {
        setShow(false);
      }, 2500);
    }

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <RotateHorizontalPhone />
      {!isLoadingUser && <HomeHeader user={userData} />}

      <div className='stand-area'>
        <div className='stand-content'>
          {show ? (
            <>
              <LoaderImage image={MarketImage} />
              <img className={imageClass} src={MarketImage} alt='danone' />
            </>
          ) : (
            <>
              <LoaderImage image={StandImage} />
              <img
                className='img-fluid img-bg-stand animate__animated animate__fadeIn '
                src={StandImage}
                alt='danone'
                // style={{ height: high }}
              />

              <Link className='btn-1' to={'/nutricion-personalizada'}></Link>
              <Link className='btn-2' to={'/microbiota-y-probioticos'}></Link>
              <Link className='btn-3' to={'/flexitarianismo'}></Link>
            </>
          )}
        </div>
        <Games />
      </div>
    </>
  );
};
