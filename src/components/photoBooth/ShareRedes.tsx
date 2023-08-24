import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import TextsmsIcon from '@mui/icons-material/Textsms';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import { blue } from '@mui/material/colors';
import { User } from '../../interfaces/auth';

interface Props {
  user: User;
}

const redes = [
  {
    icon: <TwitterIcon />,
    title: 'Twitter',
  },
  {
    icon: <FacebookIcon />,
    title: 'Facebook',
  },
  {
    icon: <TextsmsIcon />,
    title: 'Facebook Messenger',
  },
  {
    icon: <WhatsAppIcon />,
    title: 'WhatsApp',
  },
];

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  user: User;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, open, user } = props;

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (title: string) => {
    const imageUrl = user?.image;
    if (title === 'Twitter') {
      const nutritionforummxLink = 'https://www.nutritionforummx.com/';
      const tweetText = `Mira la imagen que creé en nutrition forum mx: \n${nutritionforummxLink}\n\nImagen: \n${imageUrl}`;
      const encodedTweetText = encodeURIComponent(tweetText);
      const twitterShareLink = `https://twitter.com/intent/tweet?text=${encodedTweetText}`;
      window.open(twitterShareLink, '_blank');
    } else if (title === 'Facebook') {
      const nutritionforummxLink = 'https://www.nutritionforummx.com/';

      const caption = 'Mira la imagen que creé en nutrition forum mx:';
      const description = `${nutritionforummxLink}\n\nImagen:\n${imageUrl}`;

      const picture = imageUrl;

      const facebookShareLink = `https://www.facebook.com/v2.2/dialog/share?app_id=274266067164&caption=${encodeURIComponent(
        caption
      )}&description=${encodeURIComponent(
        description
      )}&display=popup&href=${encodeURIComponent(
        imageUrl
      )}&picture=${encodeURIComponent(picture)}&sdk=joey&version=v2.2`;

      window.open(facebookShareLink, '_blank');
    } else if (title === 'Facebook Messenger') {
      const messengerShareLink = `https://www.facebook.com/v2.2/dialog/send?app_id=7278816028812660&caption=Echa%20un%20vistazo.&channel_url=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Df3fdfc736b0832c%26domain%3Dwww.pinterest.com.mx%26is_canvas%3Dfalse%26origin%3Dhttps%253A%252F%252Fwww.pinterest.com.mx%252Ffea1c25bbba5e%26relation%3Dopener&description=%20&display=popup&e2e=%7B%7D&fallback_redirect_uri=https%3A%2F%2Fwww.pinterest.com.mx%2Fpin%2F3448137207654044%2F&link=https%3A%2F%2Fpin.it%2F50OnubS&locale=en_US&name=&next=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Df1b0be7bf3513%26domain%3Dwww.pinterest.com.mx%26is_canvas%3Dfalse%26origin%3Dhttps%253A%252F%252Fwww.pinterest.com.mx%252Ffea1c25bbba5e%26relation%3Dopener%26frame%3Df3f8c735bf9b924%26result%3D%2522xxRESULTTOKENxx%2522&picture=https%3A%2F%2Fi.pinimg.com%2F564x%2F89%2F32%2F5a%2F89325adc13bbfb033f5a983b1e407030.jpg&sdk=joey&version=v2.2`;

      const updatedMessengerShareLink = messengerShareLink.replace(
        'https%3A%2F%2Fpin.it%2F50OnubS',
        encodeURIComponent(imageUrl)
      );

      window.open(updatedMessengerShareLink, '_blank');
    } else if (title === 'WhatsApp') {
      const nutritionforummxLink = 'https://www.nutritionforummx.com/';

      const messageText = `Mira la imagen que creé en nutrition forum mx:\n${nutritionforummxLink}\n\nImagen:\n${imageUrl}`;

      const encodedMessageText = encodeURIComponent(messageText);

      const whatsappShareLink = `https://wa.me/?text=${encodedMessageText}`;
      window.open(whatsappShareLink, '_blank');
    }

    // onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle sx={{ textAlign: 'center' }}>Compartir en redes</DialogTitle>
      <List sx={{ pt: 0, minWidth: '400px' }}>
        {redes.map(({ icon, title }, index) => (
          <ListItem disableGutters key={index}>
            <ListItemButton onClick={() => handleListItemClick(title)}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  {icon}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export const ShareRedes = ({ user }: Props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='content-share'>
      <button
        className='btn-share'
        aria-label='compartir en redes'
        onClick={handleClickOpen}
      >
        Compartir
      </button>
      <SimpleDialog user={user} open={open} onClose={handleClose} />
    </div>
  );
};
