import { useEffect } from 'react';
import { AuditoriumArea } from './AuditoriumArea';
import { useTitlePage } from '../../hooks/useTitlePage';

export const Auditorium = () => {
  const { setPageTitle } = useTitlePage();
  useEffect(() => {
    setPageTitle('Danone - Auditorio');
  }, []);

  return <AuditoriumArea />;
};
