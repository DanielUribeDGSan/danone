import { useEffect } from 'react';
import { PhotoBoothArea } from './PhotoBoothArea';
import { useTitlePage } from '../../hooks/useTitlePage';

export const PhotoBooth = () => {
  const { setPageTitle } = useTitlePage();
  useEffect(() => {
    setPageTitle('Danone - Photo Booth');
  }, []);

  return <PhotoBoothArea />;
};
