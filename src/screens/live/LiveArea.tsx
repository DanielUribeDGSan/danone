import { RotateVerticalPhone } from '../../components/ui/rotatePhone/RotateVerticalPhone';
import { useUser } from '../../hooks/useUser';

export const LiveArea = () => {
  const { userData, isLoadingUser } = useUser();

  return (
    <>
      <RotateVerticalPhone />

      <div className='container-iframe'>
        {!isLoadingUser && (
          <iframe
            className='responsive-iframe'
            allowFullScreen
            src={`https://game.nutritionforummx.com/evento?user=${userData.name}&email=${userData?.email}`}
          ></iframe>
        )}
      </div>
    </>
  );
};
