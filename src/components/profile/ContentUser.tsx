import ProfileImage from '../../assets/img/profile/profile.png';
import { User } from '../../interfaces/auth';

interface Props {
  user: User;
}

export const ContentUser = ({ user }: Props) => {
  return (
    <div className='user-content'>
      <div className='container-photo-user'>
        <div className='video-img-photo-user'>
          <img
            className='img-fluid img-galery'
            src={ProfileImage}
            alt='perfil danone'
          />
          {user?.profileImage && (
            <img
              className='profile-btn'
              src={user?.profileImage}
              alt='perfil danone'
            />
          )}
        </div>
      </div>

      <p className='name'>{user?.name}</p>
      <p className='lastname'>{user?.apellidos}</p>
      <p className='clave'>
        Perfil: <span>{user?.clave}</span>
      </p>
    </div>
  );
};
