import { useEffect } from 'react';
import { useTitlePage } from '../../hooks/useTitlePage';
import { StandArea } from './StandArea';

export const Stand = () => {
  const { setPageTitle } = useTitlePage();
  useEffect(() => {
    setPageTitle('Danone - Mercadito');
  }, []);
  return <StandArea />;
};
