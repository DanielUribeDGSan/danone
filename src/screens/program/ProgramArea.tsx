import { useEffect, useState } from 'react';
import StandImage from '../../assets/img/program/NF_Danone_Programa.png';
import { ButtonsProgram } from '../../components/program/ButtonsProgram';

import { HomeHeader } from '../../components/ui/headers/HomeHeader';
import { ModalProgram } from '../../components/ui/modals/ModalProgram';
import { useDanone } from '../../hooks/useDanone';
import { useUser } from '../../hooks/useUser';
// import { ButtonsBiographies } from '../../components/program/ButtonsBiographies';
// import { ButtonsBiographies2 } from '../../components/program/ButtonsBiographies2';
import { LoaderImage } from '../../components/ui/loader/LoaderImage';
import { RotateHorizontalPhone } from '../../components/ui/rotatePhone/RotateHorizontalPhone';

const urlFile = import.meta.env.VITE_URL_FILES;

export const ProgramArea = () => {
  const { userData, isLoadingUser } = useUser();

  const [programImage, setProgramImage] = useState('');
  const { getPrograms, programData } = useDanone();

  // const searchText = (input: string, output: string) => {
  //   return input.includes(output);
  // };

  // const validateText = searchText(programImage, 'xARvfUpKmHs9P81AzWgI');

  useEffect(() => {
    let isActive = true;
    if (userData && isActive) {
      const getData = async () => {
        await getPrograms(userData?.idioma);
      };

      getData();
    }

    return () => {
      isActive = false;
    };
  }, [isLoadingUser, userData?.idioma]);

  return (
    <>
      <RotateHorizontalPhone />

      {!isLoadingUser && <HomeHeader user={userData} />}

      <div
        className='program-area'
        style={{ backgroundImage: `url('${StandImage})` }}
      >
        <div className='program-content'>
          <LoaderImage image={StandImage} />

          <img
            className='img-fluid img-bg-program'
            src={StandImage}
            alt='danone'
          />

          <ButtonsProgram
            programa={programData}
            setProgramImage={setProgramImage}
            idModal='modalProgram'
          />

          <ModalProgram idModal='modalProgram'>
            <>
              {/* <p className='text-black'>{`${urlFile}/${programImage}`}</p> */}
              <div className='modal-area-img '>
                <div className='modal-content-img'>
                  <img
                    className='img-fluid img-modal'
                    src={`${urlFile}/${programImage}`}
                    alt='programa de danone'
                  />
                  {/* {validateText ? (
                    <ButtonsBiographies2 />
                  ) : (
                    <ButtonsBiographies />
                  )} */}
                </div>
              </div>
            </>
          </ModalProgram>
        </div>
      </div>
    </>
  );
};
