import { useEffect } from 'react';
import { useTitlePage } from '../../hooks/useTitlePage';
import { StandArea } from './StandArea';

export const StandOrange = () => {
  const { setPageTitle } = useTitlePage();
  useEffect(() => {
    setPageTitle('Danone - Flexitarianismo');
  }, []);
  return <StandArea />;
};
