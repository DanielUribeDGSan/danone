import { useEffect } from 'react';
import { CrasyRoadArea } from './CrasyRoadArea';
import { useTitlePage } from '../../hooks/useTitlePage';

export const CrasyRoad = () => {
  const { setPageTitle } = useTitlePage();
  useEffect(() => {
    setPageTitle('Danone - Crasy Road');
  }, []);
  return <CrasyRoadArea />;
};
