import { RefObject, useState } from 'react';
import Swal from 'sweetalert2';
import { User } from '../../interfaces/auth';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface Props {
  user: User;
  setImageOverlayState: React.Dispatch<React.SetStateAction<string>>;
  buttonRef: RefObject<HTMLButtonElement>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RemoveBackgroudimage = ({
  user,
  setImageOverlayState,
  buttonRef,
  isLoading,
}: Props) => {
  const [imageFile, setImageFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setImageFile(file);
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!imageFile) {
      Swal.fire({
        title: user?.idioma === 1 ? 'Imagen vacía' : 'Empty image',
        text:
          user?.idioma === 1
            ? 'Es necesario seleccionar una imagen'
            : 'It is necessary to select an image',
        icon: 'warning',
        confirmButtonText: user?.idioma === 1 ? 'Aceptar' : 'Accept',
      });
      return;
    }

    try {
      //   await removeBgImage(imageFile, user?.email);
      setImageOverlayState(selectedImage);
      if (buttonRef.current) {
        buttonRef.current.click();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='form-remove-img'>
      <form onSubmit={handleSubmit}>
        <div className='row w-100 p-0 m-0'>
          <div className='col-6'>
            <label htmlFor='upload-input' className='image-label'>
              {imageFile ? (
                <img
                  src={selectedImage}
                  alt='Selected'
                  className='selected-image'
                />
              ) : (
                <span>
                  {user?.idioma === 1 ? 'Seleccionar imagen' : 'Select image'}
                </span>
              )}
            </label>
            <input
              id='upload-input'
              type='file'
              accept='image/*'
              onChange={handleFileChange}
              className='input-file'
            />
          </div>
          <div className='col-6'>
            {isLoading ? (
              <Box sx={{ display: 'flex' }}>
                <CircularProgress />
              </Box>
            ) : (
              <button type='submit' className='btn-primary-lg'>
                {user?.idioma === 1 ? 'Generar imagen' : 'Generate image'}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
