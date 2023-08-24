import { useRef, RefObject } from 'react';
import html2canvas from 'html2canvas';

import Backgroud from '../../assets/img/photoBooth/back_pb_danonev1-1.png';
import Backgroud2 from '../../assets/img/photoBooth/back_pb_danonev1-2.png';

import { User } from '../../interfaces/auth';
import { useMediaQuery } from '@mui/material';
import { useDanone } from '../../hooks/useDanone';

interface Props {
  user: User;
  overlayImage: string;
  buttonRef: RefObject<HTMLButtonElement>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  imageSelected: number;
}
export const PhotoBoothImage = ({
  overlayImage,
  buttonRef,
  user,
  setIsLoading,
  imageSelected,
}: Props) => {
  const { removeBgImage } = useDanone();
  const movilIpadaScreen = useMediaQuery(
    '(max-width:1000px) and (min-width:700px)'
  );
  const movilIpadaScreen2 = useMediaQuery('(max-width:699px)');

  const backgroundImageRef = useRef<HTMLImageElement>(null);
  const overlayImageRef = useRef<HTMLImageElement>(null);

  const combineImages = () => {
    setIsLoading(true);
    const backgroundImg = backgroundImageRef.current;
    const overlayImg = overlayImageRef.current;

    if (backgroundImg && overlayImg) {
      html2canvas(backgroundImg).then((canvas) => {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const overlayWidth = overlayImg.width;
          const overlayHeight = overlayImg.height;

          if (imageSelected === 1) {
            ctx.drawImage(overlayImg, 0, 450, overlayWidth, overlayHeight);
          } else {
            if (movilIpadaScreen) {
              ctx.drawImage(overlayImg, 90, 155, overlayWidth, overlayHeight);
            } else if (movilIpadaScreen2) {
              ctx.drawImage(overlayImg, 90, 155, overlayWidth, overlayHeight);
            } else {
              ctx.drawImage(overlayImg, 300, 580, overlayWidth, overlayHeight);
            }
          }

          // Exporta el resultado como imagen
          const combinedImageURL = canvas.toDataURL('image/png');

          // Crea un enlace temporal para descargar la imagen
          const downloadLink = document.createElement('a');
          downloadLink.href = combinedImageURL;
          downloadLink.download = 'imagen_combinada.png';
          downloadLink.click();

          const blob = dataURItoBlob(combinedImageURL);
          const imageFile = new File([blob], 'imagen_combinada.png');

          setIsLoading(false);

          removeBgImage(imageFile, user?.email, 'B');
        }
      });
    }
  };

  const dataURItoBlob = (dataURI: string) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
    return new Blob([arrayBuffer], { type: mimeString });
  };

  return (
    <div>
      <div
        style={{
          zIndex: 1,
          position: 'fixed',
          overflow: 'hidden',
          height: '100vh',
          opacity: 0,
        }}
      >
        {imageSelected === 1 ? (
          <img
            className='img-fluid'
            ref={backgroundImageRef}
            src={Backgroud}
            style={{
              width: movilIpadaScreen || movilIpadaScreen2 ? '700px' : '900px',
              height:
                movilIpadaScreen || movilIpadaScreen2 ? '1400px' : '1600px',
              objectFit: 'contain',
            }}
            alt='Imagen de fondo'
          />
        ) : (
          <img
            className='img-fluid'
            ref={backgroundImageRef}
            src={Backgroud2}
            style={{
              width: movilIpadaScreen || movilIpadaScreen2 ? '540px' : '1080px',
              height:
                movilIpadaScreen || movilIpadaScreen2 ? '960px' : '1920px',
              objectFit: 'contain',
            }}
            alt='Imagen de fondo'
          />
        )}

        <img
          className='img-fluid'
          ref={overlayImageRef}
          src={overlayImage}
          style={{
            maxWidth: movilIpadaScreen
              ? '380px'
              : movilIpadaScreen2
              ? '360px'
              : '490px',
            height: movilIpadaScreen
              ? '700px'
              : movilIpadaScreen2
              ? '700px'
              : '800px',
            maxHeight: movilIpadaScreen
              ? '900px'
              : movilIpadaScreen2
              ? '900px'
              : '900px',
            objectFit: 'contain',
          }}
          alt='Imagen superpuesta'
        />
      </div>
      <div
        style={{
          position: 'relative',
          zIndex: 3,
        }}
      >
        <button
          className='btn-primary'
          style={{
            backgroundColor: 'black',
            position: 'absolute',
            right: 50,
            top: 20,
          }}
          onClick={combineImages}
          ref={buttonRef}
        />
      </div>
    </div>
  );
};
