import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  urlSpanish: string;
  urlEnglish: string;
  lenguage: string;
}

export const MenuLenguages = ({ urlEnglish, urlSpanish, lenguage }: Props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          backgroundColor: 'var(--tp-theme-2)',
          padding: '0.5rem 0.5rem',
          color: 'var(--tp-theme-1)',
          marginBottom: '1rem',
          '&:hover': {
            backgroundColor: 'var(--tp-theme-2)',
            color: 'var(--tp-theme-1)',
          },
        }}
      >
        {lenguage === 'esp' ? 'Select your language' : 'Selecciona el lenguaje'}
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
          <Link
            className='link w-100'
            to={urlSpanish}
            style={{
              paddingTop: '6px',
              paddingBottom: '6px',
              boxSizing: 'border-box',
              whiteSpace: 'nowrap',
              paddingLeft: '16px',
              paddingRight: '16px',
            }}
          >
            Español
          </Link>
        </MenuItem>
        <MenuItem sx={{ padding: 0 }}>
          <Link
            className='link w-100'
            to={urlEnglish}
            style={{
              paddingTop: '6px',
              paddingBottom: '6px',
              boxSizing: 'border-box',
              whiteSpace: 'nowrap',
              paddingLeft: '16px',
              paddingRight: '16px',
            }}
          >
            Ingles
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
};
