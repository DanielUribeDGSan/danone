import { useEffect } from 'react';
import { useTitlePage } from '../../hooks/useTitlePage';
import { ProgramArea } from './ProgramArea';

export const Program = () => {
  const { setPageTitle } = useTitlePage();
  useEffect(() => {
    setPageTitle('Danone - Programa');
  }, []);

  return <ProgramArea />;
};
