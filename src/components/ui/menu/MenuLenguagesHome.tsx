import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { useDispatch } from 'react-redux';
import MenuItem from '@mui/material/MenuItem';
import { update_lenguage } from '../../../redux/features/auth-slice';
import { useState } from 'react';
import { useUser } from '../../../hooks/useUser';

export const MenuLenguagesHome = () => {
  const dispatch = useDispatch();
  const { userData, isLoadingUser } = useUser();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickChangeLenguage = (lenguage: number) => {
    const lenguageObj = { idioma: lenguage };
    dispatch(update_lenguage(lenguageObj));
    handleClose();
  };

  if (isLoadingUser) {
    return <></>;
  }

  return (
    <div>
      <Button
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          color: 'var(--tp-common-white)',
          padding: 0,
          marginLeft: '0px',
          textAlign: 'left',
          fontSize: '0.7rem',
        }}
      >
        {userData?.idioma === 1
          ? 'Select your language'
          : 'Selecciona tu idioma'}
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem sx={{ padding: 0 }}>
          <button
            onClick={() => handleClickChangeLenguage(1)}
            aria-label='cambiar a español'
            style={{ width: '100%', padding: '0.5rem 1rem' }}
          >
            Español
          </button>
        </MenuItem>
        <MenuItem sx={{ padding: 0 }}>
          <button
            onClick={() => handleClickChangeLenguage(2)}
            aria-label='cambiar a ingles'
            style={{ width: '100%', padding: '0.5rem 1rem' }}
          >
            Ingles
          </button>
        </MenuItem>
      </Menu>
    </div>
  );
};
