import { useEffect } from 'react';
import { useTitlePage } from '../../hooks/useTitlePage';
import { ProfileArea } from './ProfileArea';

export const Profile = () => {
  const { setPageTitle } = useTitlePage();
  useEffect(() => {
    setPageTitle('Danone - Mi perfil');
  }, []);
  return <ProfileArea />;
};
