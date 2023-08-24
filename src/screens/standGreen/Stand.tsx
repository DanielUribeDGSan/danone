import { useEffect } from 'react';
import { useTitlePage } from '../../hooks/useTitlePage';
import { StandArea } from './StandArea';

export const StandGreen = () => {
  const { setPageTitle } = useTitlePage();
  useEffect(() => {
    setPageTitle('Danone - Microbiota y Probioticos');
  }, []);
  return <StandArea />;
};
