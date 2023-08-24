import LiveICon from '../../../assets/img/header/live.svg';
import { User } from '../../../interfaces/auth';
interface Props {
  user: User;
}
export const Live = ({ user }: Props) => {
  return (
    <div className='live'>
      {user?.idioma === 1 ? (
        <a
          href={`https://game.nutritionforummx.com/evento?user=${user.name}&email=${user?.email}`}
        >
          <img className='img-fluid' src={LiveICon} alt='live icon' />
          <p>{user?.idioma === 1 ? 'IR A EN VIVO' : 'GO LIVE'}</p>
        </a>
      ) : (
        <a
          href={`https://game.nutritionforummx.com/evento-ing?user=${user.name}&email=${user?.email}`}
        >
          <img className='img-fluid' src={LiveICon} alt='live icon' />
          <p>{user?.idioma === 1 ? 'IR A EN VIVO' : 'GO LIVE'}</p>
        </a>
      )}
    </div>
  );
};
