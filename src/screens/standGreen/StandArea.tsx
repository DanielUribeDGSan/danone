import { useEffect } from 'react';
import Swal from 'sweetalert2';
import 'animate.css';
import StandImage from '../../../src/assets/img/stand/DanoneMicrobiotaYProbioticos.png';
import Ranking from '../../../src/assets/img/buttons/ir_a_jugar.svg';
import { Link, useNavigate } from 'react-router-dom';
import { HomeHeader } from '../../components/ui/headers/HomeHeader';
import { useUser } from '../../hooks/useUser';
import { ModalStand } from '../../components/ui/modals/ModalStand';
// import { Link } from 'react-router-dom';

import { LoaderImage } from '../../components/ui/loader/LoaderImage';
import { useDanone } from '../../hooks/useDanone';
import { RotateHorizontalPhone } from '../../components/ui/rotatePhone/RotateHorizontalPhone';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const StandArea = () => {
  const { userData, isLoadingUser } = useUser();
  const { getScore, score, scoreYourPosicion, getInfoGame, infoGame } =
    useDanone();

  const navigate = useNavigate();

  const handleClick = () => {
    Swal.fire({
      title: `<strong>${infoGame?.nombre}</strong>`,
      html:
        `<img class="img-fluid" src="${infoGame?.imagen_informacion}" style="margin-bottom:1rem; border-radius:10px" />` +
        `<p class="text-black">${
          userData?.idioma === 1
            ? infoGame?.descripcion
            : infoGame?.descripcion_ingles
        }</p>` +
        `<a style='margin-top:0.5rem; color:#000;text-decoration: underline;text-decoration-color: #000;' target='_blank' href=${
          infoGame?.terminos_y_condiciones
        }> ${
          userData?.idioma === 1
            ? 'Términos y condiciones'
            : 'Terms and Conditions'
        }  </a>`,
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      confirmButtonText: userData?.idioma === 1 ? 'Entendido' : 'Understood',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
      cancelButtonAriaLabel: 'Thumbs down',
    });
  };
  const handleClickGame = () => {
    navigate('/probioticos');
  };

  useEffect(() => {
    let active = true;

    if (active && userData?.email) {
      getScore(userData?.email, 1);
      getInfoGame(2);
    }

    return () => {
      active = false;
    };
  }, [isLoadingUser]);

  return (
    <>
      <RotateHorizontalPhone />

      {!isLoadingUser && <HomeHeader user={userData} />}

      <div className='stand-area-green'>
        <div className='stand-content'>
          <LoaderImage image={StandImage} />
          <img
            className='img-fluid img-bg-stand animate__animated animate__fadeIn '
            src={StandImage}
            alt='danone'
            style={{
              height: '100%',
              width: '100%',
            }}
          />
          <button className='btn-button' onClick={handleClickGame}>
            <img className='img-fluid' src={Ranking} alt='danone' />
          </button>

          <a
            className='infografia'
            href={infoGame?.url_infografia}
            target='_blank'
          />

          <button
            className='ranking'
            aria-label='mostrar datos del stand'
            data-bs-toggle='modal'
            data-bs-target='#modalStand'
          />
          <Link to={'/nutricion-personalizada'} className='btn-left'>
            <ArrowBackIosNewIcon />
          </Link>
          <Link to={'/flexitarianismo'} className='btn-right'>
            <ArrowForwardIosIcon />
          </Link>

          {/* <button
            className='btn-1'
            aria-label='mostrar datos del stand'
            data-bs-toggle='modal'
            data-bs-target='#modalStand'
          /> */}
        </div>
        <ModalStand idModal={'modalStand'}>
          <>
            <h2>{infoGame?.nombre}</h2>
            <span>ranking</span>
            {score.length === 0 ? (
              <p className='mt-20'>
                Aún no se ha generado ranking en este juego
              </p>
            ) : (
              <div className='table-responsive'>
                <table className='table' style={{ borderSpacing: '0 10px' }}>
                  <thead></thead>
                  <tbody>
                    {score?.map(({ name, apellidos, score }, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          {name} {apellidos}
                        </td>
                        <td>{score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <hr />
            {!isLoadingUser && (
              <div className='user-score'>
                {scoreYourPosicion?.name && (
                  <>
                    <span>
                      {userData?.idioma === 1 ? 'tu posición' : 'your position'}
                    </span>

                    <div className='table-responsive overflow-hidden'>
                      <table
                        className='table'
                        style={{ borderSpacing: '0 10px' }}
                      >
                        <thead></thead>
                        <tbody>
                          <tr>
                            <td>{scoreYourPosicion?.posicion}</td>
                            <td>
                              {scoreYourPosicion?.name}
                              {scoreYourPosicion?.apellidos}
                            </td>
                            <td>{scoreYourPosicion?.score}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </>
                )}

                <div>
                  <button
                    className='btn-primary-md mr-20'
                    data-bs-dismiss='modal'
                    aria-label='jugar'
                    onClick={handleClickGame}
                  >
                    {userData?.idioma === 1 ? 'Jugar' : 'Play'}
                  </button>
                  <button
                    className='btn-secondary-md'
                    aria-label='info juego'
                    onClick={handleClick}
                  >
                    {userData?.idioma === 1
                      ? 'Información sobre el juego'
                      : 'Information about the game'}
                  </button>
                </div>
              </div>
            )}
          </>
        </ModalStand>
      </div>
    </>
  );
};
