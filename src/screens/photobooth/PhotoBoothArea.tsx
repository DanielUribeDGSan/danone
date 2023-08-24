import { useRef, useState } from 'react';
import { PhotoBoothContent } from '../../components/photoBooth/PhotoBoothContent';
import { PhotoBoothImage } from '../../components/photoBooth/PhotoBoothImage';
import { HomeHeader } from '../../components/ui/headers/HomeHeader';
import { RotateHorizontalPhone } from '../../components/ui/rotatePhone/RotateHorizontalPhone';
import { useUser } from '../../hooks/useUser';

export const PhotoBoothArea = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { userData, isLoadingUser } = useUser();
  const [imageOverlayState, setImageOverlayState] = useState('');
  const [imageSelected, setImageSelected] = useState(1);

  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <RotateHorizontalPhone />
      {!isLoadingUser && <HomeHeader user={userData} />}
      {!isLoadingUser && (
        <PhotoBoothImage
          imageSelected={imageSelected}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          user={userData}
          overlayImage={imageOverlayState}
          buttonRef={buttonRef}
        />
      )}
      {!isLoadingUser && (
        <PhotoBoothContent
          setImageSelected={setImageSelected}
          imageSelected={imageSelected}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          user={userData}
          setImageOverlayState={setImageOverlayState}
          buttonRef={buttonRef}
        />
      )}
    </>
  );
};
