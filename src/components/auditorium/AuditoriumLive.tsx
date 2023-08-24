import { useEffect, useRef, useState } from 'react';
import ImgAuditorium from '../../assets/img/auditorium/auditorio.jpg';
import { LoaderImage } from '../ui/loader/LoaderImage';
import { collection, doc, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../firebase/firebase.js';
import { AuditoriumData } from '../../interfaces/auditorium.js';

import LiveImage from '../../assets/img/svg/live-auditorio.svg';
import ButtonLive from '../../assets/img/buttons/button-live-auditorio.svg';
import { User } from '../../interfaces/auth.js';

interface Props {
  user: User;
}

export const AuditoriumLive = ({ user }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const [auditorium, setAuditorium] = useState<AuditoriumData[]>([]);
  useEffect(() => {
    cargarMensajes();
  }, []);

  async function cargarMensajes() {
    const colSala = collection(db, 'col-sala');
    const docTattoo = doc(colSala, 'danone');
    const colChat = collection(docTattoo, 'col-auditorio');

    try {
      const unsubscribe = onSnapshot(query(colChat), (querySnapshot) => {
        const auditoriumData: any = [];

        querySnapshot.forEach((doc) => {
          const mensaje = doc.data();
          auditoriumData.push(mensaje);
        });

        setAuditorium(auditoriumData);
      });

      return unsubscribe; // Devuelve la función para desuscribirse de los cambios
    } catch (error) {
      console.error('Error al obtener los mensajes:', error);
    }
  }

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [imageLoaded]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className='container-video-img section-auditorium' ref={containerRef}>
      <div className='video-img-content'>
        <LoaderImage image={ImgAuditorium} />
        <img
          className='img-content'
          src={ImgAuditorium}
          alt='danone'
          onLoad={handleImageLoad}
        />
        {auditorium.length > 0 && (
          <>
            <img
              className='img-person'
              src={auditorium[0]?.urlImage}
              alt='image danone person'
            />
            <img className='img-live' src={LiveImage} alt='image danone live' />
            <p className='name'>{auditorium[0]?.name}</p>
            <p className='lastname'>{auditorium[0]?.lastName}</p>
            <p className='title'>{auditorium[0]?.title}</p>

            {user?.idioma === 1 ? (
              <a
                className='button-live'
                href={`https://game.nutritionforummx.com/evento?user=${user.name}&email=${user?.email}`}
              >
                <img src={ButtonLive} alt='image danone live' />
              </a>
            ) : (
              <a
                className='button-live'
                href={`https://game.nutritionforummx.com/evento-ing?user=${user.name}&email=${user?.email}`}
              >
                <img src={ButtonLive} alt='image danone live' />
              </a>
            )}
          </>
        )}
      </div>
    </div>
  );
};
