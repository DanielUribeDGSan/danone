import { RefObject, useEffect, useRef, useState } from 'react';
import ImgPhotoBooth from '../../assets/img/photoBooth/NF_Danone_PhotoBooth_.jpg';
import ImgGallery from '../../assets/img/photoBooth/image-galery.png';
import { LoaderImage } from '../ui/loader/LoaderImage.js';
import { RemoveBackgroudimage } from './RemoveBackgroudimage.js';
import { User } from '../../interfaces/auth.js';
import { ModalPhotoBooth } from '../ui/modals/ModalPhotoBooth.js';
import { ShareRedes } from './ShareRedes.js';

interface Props {
  user: User;
  // imageOverlayState: boolean;
  setImageOverlayState: React.Dispatch<React.SetStateAction<string>>;
  buttonRef: RefObject<HTMLButtonElement>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setImageSelected: React.Dispatch<React.SetStateAction<number>>;
  imageSelected: number;
}

export const PhotoBoothContent = ({
  user,
  setImageOverlayState,
  buttonRef,
  isLoading,
  setIsLoading,
  setImageSelected,
  imageSelected,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      // containerRef.current.scrollTo({
      //   top: containerRef.current.scrollHeight,
      //   behavior: 'smooth',
      // });
    }
  }, [imageLoaded]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <>
      <div
        className='container-video-img '
        ref={containerRef}
        style={{ zIndex: 2, backgroundColor: 'var(--tp-common-white)' }}
      >
        <div className='video-img-content'>
          <LoaderImage image={ImgPhotoBooth} />

          <button
            className='button-generate'
            aria-label='mostrar datos del photo booth'
            data-bs-toggle='modal'
            data-bs-target='#modalPhotoBooth'
          >
            {user?.idioma === 1 ? 'Generar foto' : 'Generate photo'}
          </button>

          <img
            className='img-content'
            src={ImgPhotoBooth}
            alt='danone'
            onLoad={handleImageLoad}
          />
          {user?.image && (
            <>
              <img className='img-nutrition' src={user?.image} alt='danone' />
              <ShareRedes user={user} />
            </>
          )}
        </div>
      </div>

      <ModalPhotoBooth idModal={'modalPhotoBooth'}>
        <>
          <div className='container-photo' ref={containerRef}>
            <div className='video-img-photo'>
              <img
                className='img-fluid img-galery'
                src={ImgGallery}
                alt='Galeria danone'
              />
              {/* <span className='share'>
                {user?.idioma === 1 ? 'Compartir imagen' : 'Share image'}
              </span> */}

              <button
                className='btn-1'
                onClick={() => setImageSelected(1)}
                style={{
                  backgroundColor: 'var(--tp-theme-1)',
                  opacity: imageSelected === 1 ? '0.2' : '0',
                }}
              />
              <button
                className='btn-2'
                onClick={() => setImageSelected(2)}
                style={{
                  backgroundColor: 'var(--tp-theme-1)',
                  opacity: imageSelected === 2 ? '0.2' : '0',
                }}
              />
            </div>
          </div>

          <RemoveBackgroudimage
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            user={user}
            setImageOverlayState={setImageOverlayState}
            buttonRef={buttonRef}
          />
        </>
      </ModalPhotoBooth>
    </>
  );
};
