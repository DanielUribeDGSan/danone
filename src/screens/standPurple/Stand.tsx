import { useEffect } from 'react';
import { useTitlePage } from '../../hooks/useTitlePage';
import { StandArea } from './StandArea';

export const StandPurple = () => {
  const { setPageTitle } = useTitlePage();
  useEffect(() => {
    setPageTitle('Danone - Nutrición Personalizada');
  }, []);
  return <StandArea />;
};
