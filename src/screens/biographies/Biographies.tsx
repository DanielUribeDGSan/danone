import { useEffect } from 'react';
import { BiographiesArea } from './BiographiesArea';
import { useTitlePage } from '../../hooks/useTitlePage';

export const Biographies = () => {
  const { setPageTitle } = useTitlePage();
  useEffect(() => {
    setPageTitle('Danone - Biografia');
  }, []);

  return <BiographiesArea />;
};
