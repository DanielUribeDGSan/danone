import { useEffect } from 'react';
import { ConfirmationArea } from './ConfirmationArea';
import { useTitlePage } from '../../hooks/useTitlePage';

export const Confirmation = () => {
  const { setPageTitle } = useTitlePage();
  useEffect(() => {
    setPageTitle('Danone - Confirmación de registro');
  }, []);

  return <ConfirmationArea />;
};
