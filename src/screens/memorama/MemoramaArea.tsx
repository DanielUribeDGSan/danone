import { Link } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export const MemoramaArea = () => {
  const { userData, isLoadingUser } = useUser();

  if (isLoadingUser) {
    return <p>Cargando..</p>;
  }

  return (
    <div className='container-iframe'>
      <Link className='btn-float' to={'/nutricion-personalizada'}>
        <KeyboardBackspaceIcon />
      </Link>
      <iframe
        src={`https://game.nutritionforummx.com/DANONE/index.html?email=${userData?.email}`}
        id='myIframe'
        className='responsive-iframe'
      />
    </div>
  );
};
