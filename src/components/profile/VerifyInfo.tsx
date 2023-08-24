import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { User } from '../../interfaces/auth';
import { ThemeProvider, createTheme } from '@mui/material';
import { update_constancia_user } from '../../redux/features/auth-slice';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5e61b5',
    },
    secondary: {
      main: '#5e61b5',
    },
  },
});

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
}

export const VerifyInfo = ({ open, setOpen, user }: Props) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState(`${user?.name} ${user?.apellidos}`);

  const generateProof = () => {
    window.open(
      `https://apidanone.mediaserviceagency.com/api/exportar-constancia/${input}/${user?.email}/${user?.idioma}`,
      '_blank'
    );
    const constanciaData = { constancia: 1 };
    dispatch(update_constancia_user(constanciaData));
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeInput = (event: any) => {
    setInput(event.target.value);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            {user?.idioma === 1 ? ' Constancia' : ' Proof'}
          </DialogTitle>
          <DialogContent>
            {user?.idioma === 1 ? (
              <>
                <DialogContentText
                  sx={{
                    marginBottom: '0.5rem',
                    color: 'var(--tp-common-black)',
                    opacity: 0.6,
                  }}
                >
                  Estas por generar tu constancia y esta es la única vez que
                  podrás generarla.
                </DialogContentText>
                <DialogContentText
                  sx={{
                    marginBottom: '0.5rem',
                    color: 'var(--tp-common-black)',
                    opacity: 0.6,
                  }}
                >
                  En el siguiente campo de texto está el nombre con el que te
                  registraste, si este esta mal o quieres cambiarlo hazlo antes
                  de generar tu constancia.
                </DialogContentText>
              </>
            ) : (
              <>
                <DialogContentText
                  sx={{
                    marginBottom: '0.5rem',
                    color: 'var(--tp-common-black)',
                    opacity: 0.6,
                  }}
                >
                  You are about to generate your constancia and this is the only
                  time you will be able to generate it.
                </DialogContentText>
                <DialogContentText
                  sx={{
                    marginBottom: '0.5rem',
                    color: 'var(--tp-common-black)',
                    opacity: 0.6,
                  }}
                >
                  In the next text field is the name you registered with, if
                  this is wrong or you want to change it, please do it before
                  generating your certificate.
                </DialogContentText>
              </>
            )}

            <TextField
              autoFocus
              margin='dense'
              id='constancia'
              label={user?.idioma === 1 ? 'Nombre completo' : 'Full name'}
              type='text'
              fullWidth
              variant='standard'
              onChange={handleChangeInput}
              value={input}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>
              {user?.idioma === 1 ? 'Cancelar' : 'Cancel'}
            </Button>
            <Button onClick={generateProof}>
              {user?.idioma === 1 ? 'Generar constancia' : 'Generate proof'}
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </div>
  );
};
