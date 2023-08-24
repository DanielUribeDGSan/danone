import { useEffect } from 'react';
import { HomeArea } from './HomeArea';
import { useTitlePage } from '../../hooks/useTitlePage';

export const Home = () => {
  const { setPageTitle } = useTitlePage();
  useEffect(() => {
    setPageTitle('Danone - Inicio');
  }, []);

  return <HomeArea />;
};
