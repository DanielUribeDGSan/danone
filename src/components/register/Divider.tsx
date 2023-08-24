import useMediaQuery from '@mui/material/useMediaQuery';
import Separador from '../../assets/img/register/separador.svg';

export const Divider = () => {
  const movilIpadaScreen = useMediaQuery('(max-width:1000px)');

  return (
    <div>
      {!movilIpadaScreen && (
        <img
          className='img-fluid'
          src={Separador}
          alt='danone'
        />
      )}
    </div>
  );
};
