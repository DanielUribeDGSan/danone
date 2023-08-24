import { AuditoriumLive } from '../../components/auditorium/AuditoriumLive';
import { HomeHeader } from '../../components/ui/headers/HomeHeader';
import { RotateHorizontalPhone } from '../../components/ui/rotatePhone/RotateHorizontalPhone';
import { useUser } from '../../hooks/useUser';

export const AuditoriumArea = () => {
  // localStorage.removeItem('configuredCookie');
  const { userData, isLoadingUser } = useUser();

  return (
    <>
      {!isLoadingUser && <HomeHeader user={userData} />}
      <RotateHorizontalPhone />
      {!isLoadingUser && <AuditoriumLive user={userData} />}
    </>
  );
};
