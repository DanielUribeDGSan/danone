import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import { User } from '../../../interfaces/auth';
import { MenuLenguagesHome } from '../menu/MenuLenguagesHome';

interface Props {
  user: User;
}

export const UserCircle = ({ user }: Props) => {
  return (
    <List sx={{ width: '100%' }}>
      <ListItem
        alignItems='flex-start'
        sx={{
          padding: '0rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ListItemAvatar>
          <Avatar
            alt='Remy Sharp'
            src={user?.profileImage ? user?.profileImage : ''}
            sx={{
              width: 56,
              height: 56,
              marginRight: '10px',
              border: '4px solid var(--tp-theme-2)',
            }}
          />
        </ListItemAvatar>
        <div>
          <ListItemText
            sx={{ color: 'var(--tp-common-white)' }}
            primary={`${user?.name} ${user?.apellidos}`}
            secondary={
              <>
                <Link
                  className='link'
                  to={'/perfil'}
                  style={{
                    color: 'var(--tp-theme-2)',
                    borderBottom: '1px solid var(--tp-theme-2)',
                    paddingBottom: '3px',
                  }}
                >
                  {user?.idioma === 1 ? 'Ir a mi perfil' : 'Go to my profile'}
                </Link>
              </>
            }
          />
          <MenuLenguagesHome />
        </div>
      </ListItem>
    </List>
  );
};
