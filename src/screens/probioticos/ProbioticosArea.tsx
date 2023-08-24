import { Link } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export const ProbioticosArea = () => {
  const { userData, isLoadingUser } = useUser();

  if (isLoadingUser) {
    return <p>Cargando..</p>;
  }

  return (
    <div className='container-iframe'>
      <Link className='btn-float' to={'/microbiota-y-probioticos'}>
        <KeyboardBackspaceIcon />
      </Link>
      <iframe
        src={`https://game.nutritionforummx.com/PROBIOTICOS/HTML5/index.html?email=${userData?.email}`}
        id='myIframe'
        className='responsive-iframe'
      />
    </div>
  );
};
