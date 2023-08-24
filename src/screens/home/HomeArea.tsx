import { useEffect } from 'react';
import { Lobby } from '../../components/home/Lobby';
import { DrawerCookies } from '../../components/ui/configurationCookies/DrawerCookies';
import { DrawerCookiesIng } from '../../components/ui/configurationCookiesIng/DrawerCookies';
import { HomeHeader } from '../../components/ui/headers/HomeHeader';
import { useDanone } from '../../hooks/useDanone';
import { useUser } from '../../hooks/useUser';
import { RotateHorizontalPhone } from '../../components/ui/rotatePhone/RotateHorizontalPhone';

const accesLogin = true;

export const HomeArea = () => {
  // localStorage.removeItem('configuredCookie');
  const { userData, isLoadingUser } = useUser();
  const { logout } = useDanone();

  useEffect(() => {
    if (!accesLogin && userData?.idioma) {
      logout(userData?.idioma);
    }
  }, [userData?.idioma]);

  return (
    <>
      {!isLoadingUser && <HomeHeader user={userData} />}
      <RotateHorizontalPhone />
      <Lobby />
      {userData?.idioma === 1 ? <DrawerCookies /> : <DrawerCookiesIng />}
    </>
  );
};
