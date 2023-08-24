import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDanone } from '../../hooks/useDanone';
import { useUser } from '../../hooks/useUser';
import { HomeHeader } from '../../components/ui/headers/HomeHeader';
import { InfoDR } from '../../components/biographies/InfoDR';

const urlFile = import.meta.env.VITE_URL_FILES;

export const BiographiesArea = () => {
  const { biografiaId } = useParams();

  const { userData, isLoadingUser } = useUser();

  const { getBiographies, biographiesData } = useDanone();

  useEffect(() => {
    let isActive = true;
    if (userData && isActive && biografiaId) {
      const getData = async () => {
        await getBiographies(userData?.idioma, parseInt(biografiaId));
      };

      getData();
    }

    return () => {
      isActive = false;
    };
  }, [isLoadingUser, biografiaId]);

  return (
    <>
      {!isLoadingUser && <HomeHeader user={userData} />}

      <div className='container mt-50 biographies-area'>
        {biographiesData.id !== 0 && (
          <div className='row m-0 w-100 d-flex align-items-center justify-content-center'>
            <div className='col-xxl-6 col-xl-6 col-lg-6 d-flex align-items-center justify-content-center'>
              <img
                className='img-fluid img-biographies'
                src={`${urlFile}/${biographiesData?.imagen}`}
              />
            </div>
            <div className='col-xxl-6 col-xl-6 col-lg-6 d-flex align-items-center justify-content-center'>
              <InfoDR biographie={biographiesData} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
