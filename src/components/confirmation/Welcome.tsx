// import { Link } from 'react-router-dom';
import Logo from '../../assets/img/confirmation/logo.svg';
import { User } from '../../interfaces/auth';

interface Props {
  user: User;
}

export const Welcome = ({ user }: Props) => {
  return (
    <div className='welcome d-flex align-items-center justify-content-center flex-column'>
      <p className='primary'>
        {user?.idioma === 1
          ? 'GRACIAS POR REGISTRARTE A'
          : 'THANK YOU FOR REGISTERING TO'}
      </p>
      <img src={Logo} alt='danone' className='img-fluid logo' />
      <p>
        {user?.idioma === 1
          ? 'Tu registro ha sido exitoso.'
          : 'Your registration has been successful.'}
      </p>
      <p className='user'>
        {user?.name} {user?.apellidos}
      </p>
      <p className='primary'>
        {user?.idioma === 1 ? 'PERFIL:' : 'PROFILE:'} {user?.clave}
      </p>
      {/* <Link className='btn-secondary-lg text-white fw-bold' to={'/'}>
        ENTRAR
      </Link> */}
    </div>
  );
};
