import { KeyboardEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import { UserCircle } from './UserCircle';
import { Live } from './Live';

import IconHeader from '../../../assets/img/header/collapse-icon.svg';
import LogoHeader from '../../../assets/img/header/header-logo.svg';
import LogoFooter from '../../../assets/img/header/LOGO_DANONE.svg';

import Icon1 from '../../../assets/img/header/icons/icon1.svg';
import Icon2 from '../../../assets/img/header/icons/icon2.svg';
import Icon3 from '../../../assets/img/header/icons/icon3.svg';
import Icon4 from '../../../assets/img/header/icons/icon4.svg';
import Icon5 from '../../../assets/img/header/icons/icon5.svg';
import icon7 from '../../../assets/img/header/icons/icon7.svg';
import icon8 from '../../../assets/img/header/icons/icon8.svg';
import icon9 from '../../../assets/img/header/icons/icon9.svg';

import { Icon } from './Icon';
import { Link } from 'react-router-dom';
import { useDanone } from '../../../hooks/useDanone';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { User } from '../../../interfaces/auth';
import { useMediaQuery } from '@mui/material';
import { DrawerCookiesHeader } from '../configurationCookiesHeader/DrawerCookies';
import { DrawerCookiesHeaderIng } from '../configurationCookiesHeaderIng/DrawerCookies';
import { Videos } from '../../../interfaces/ondemand';

interface Links {
  icon: string;
  link: string;
  title: string;
}

interface Props {
  user: User;
}

export const HomeHeader = ({ user }: Props) => {
  const linksButtons: Links[] = [
    { icon: Icon1, link: '/', title: user?.idioma === 1 ? 'Inicio' : 'Home' },
    {
      icon: Icon2,
      link: '/programa',
      title: user?.idioma === 1 ? 'Programa' : 'Program',
    },
    {
      icon: Icon3,
      link: 'bio',
      title: user?.idioma === 1 ? 'BIOGRAFÍAS' : 'BIOGRAPHIES',
    },
    {
      icon: Icon4,
      link: '/mercadito',
      title: user?.idioma === 1 ? 'MERCADITO' : 'MARKET',
    },
    { icon: Icon5, link: '/photobooth', title: 'PHOTO booth' },
    {
      icon: icon7,
      link: 'rec',
      title: user?.idioma === 1 ? 'Recetario' : 'Recipe book',
    },
  ];

  const {
    logout,
    getAllBiographies,
    biographiesAllData,
    getAllRecipeBook,
    getOndemand,
    recipeBook,
  } = useDanone();
  const [state, setState] = useState({
    left: false,
  });
  const buttonMenu = useRef<HTMLButtonElement>(null);
  const [openCookies, setOpenCookies] = useState(false);
  const [open, setOpen] = useState(false);
  const [videosOndemand, setVideosOndemand] = useState<Videos[]>([]);
  const [open2, setOpen2] = useState(false);
  const [openOndemand, setOpenOndemand] = useState(false);
  const [openHeader, setOpenHeader] = useState(false);

  const movilIpadaScreen = useMediaQuery('(max-width:1000px)');

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClick2 = () => {
    setOpen2(!open2);
  };

  const handleClickOndemand = () => {
    setOpenOndemand(!openOndemand);
  };

  const toggleDrawer =
    (anchor: 'left', open: boolean) => (event: KeyboardEvent | MouseEvent) => {
      setOpenHeader(!openHeader);
      if (
        event.type === 'keydown' &&
        ((event as KeyboardEvent).key === 'Tab' ||
          (event as KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const onLogoutClick = () => logout(user?.idioma);

  const handleClickCloseDrawer = () => {
    if (buttonMenu.current && openHeader) buttonMenu.current.click();
  };

  useEffect(() => {
    let active = true;

    if (active && user?.idioma) {
      getAllBiographies(user?.idioma);
    }

    return () => {
      active = false;
    };
  }, [user?.idioma]);

  useEffect(() => {
    let active = true;

    if (active) {
      getAllRecipeBook();
    }

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;

    if (active) {
      getOndemand()
        .then((videos) => {
          setVideosOndemand(videos);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    return () => {
      active = false;
    };
  }, []);

  const list = (anchor: 'left') => (
    <Box
      sx={{
        width: movilIpadaScreen ? 200 : 250,
        backgroundColor: 'var(--tp-theme-1)',
      }}
      role='presentation'
      // onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className='header-items '>
        {user?.idioma === 1 ? (
          <DrawerCookiesHeader open={openCookies} setOpen={setOpenCookies} />
        ) : (
          <DrawerCookiesHeaderIng open={openCookies} setOpen={setOpenCookies} />
        )}
        <div className='separator' />
        <div className='container'>
          <UserCircle user={user} />

          <Live user={user} />
          <>
            <List>
              {linksButtons.map(({ icon, title, link }, index) => {
                return link !== 'bio' && link !== 'rec' ? (
                  <ListItem
                    key={index}
                    disablePadding
                    sx={{
                      borderBottom: '1px solid var(--tp-common-white)',
                      marginBottom: '0.5rem',
                      marginTop: '0.5rem',
                    }}
                  >
                    <Link to={link} className='w-100'>
                      <ListItemButton
                        sx={{
                          minWidth: 'auto',
                          padding: movilIpadaScreen ? '0.5rem' : '0.5rem',
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 'auto',
                            marginRight: movilIpadaScreen ? '0.5rem' : '1rem',
                          }}
                        >
                          <Icon icon={icon} />
                        </ListItemIcon>
                        <ListItemText
                          primary={title}
                          sx={{
                            color: 'var(--tp-common-white)',
                            textTransform: 'uppercase',
                            fontSize: '0.9rem',
                            margin: '0rem',
                            padding: '0rem',
                          }}
                        />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                ) : (
                  <div key={index}>
                    {link === 'bio' ? (
                      <>
                        <ListItemButton
                          onClick={handleClick}
                          sx={{
                            borderBottom: '1px solid var(--tp-common-white)',
                            marginBottom: '0.5rem',
                            marginTop: '0.5rem',
                            padding: movilIpadaScreen ? '0.5rem' : '0.5rem',
                            svg: {
                              position: 'relative',
                              right: '-15px',
                            },
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 'auto',
                              marginRight: movilIpadaScreen ? '0.5rem' : '1rem',
                            }}
                          >
                            <Icon icon={icon} />
                          </ListItemIcon>
                          <ListItemText
                            primary={title}
                            sx={{
                              color: 'var(--tp-common-white)',
                              textTransform: 'uppercase',
                              fontSize: '0.9rem',
                              margin: '0rem',
                              padding: '0rem',
                            }}
                          />
                          {open ? (
                            <ExpandLess
                              sx={{ color: 'var(--tp-common-white)' }}
                            />
                          ) : (
                            <ExpandMore
                              sx={{ color: 'var(--tp-common-white)' }}
                            />
                          )}
                        </ListItemButton>

                        <Collapse in={open} timeout='auto' unmountOnExit>
                          <List component='div' disablePadding>
                            {biographiesAllData.map(({ id, nombre }, index) => (
                              <Link
                                to={`/biografia/${id}`}
                                className='w-100'
                                key={index}
                              >
                                <ListItemButton
                                  sx={{ pl: 4 }}
                                  onClick={toggleDrawer('left', !openHeader)}
                                >
                                  <ListItemText
                                    primary={nombre}
                                    sx={{
                                      color: 'var(--tp-common-white)',
                                      textTransform: 'uppercase',
                                      fontSize: '0.9rem',
                                      margin: '0rem',
                                      padding: '0rem',
                                    }}
                                  />
                                </ListItemButton>
                              </Link>
                            ))}
                          </List>
                        </Collapse>
                      </>
                    ) : (
                      <>
                        <ListItemButton
                          onClick={handleClick2}
                          sx={{
                            borderBottom: '1px solid var(--tp-common-white)',
                            marginBottom: '0.5rem',
                            marginTop: '0.5rem',
                            padding: movilIpadaScreen ? '0.5rem' : '0.5rem',
                            svg: {
                              position: 'relative',
                              right: '-15px',
                            },
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 'auto',
                              marginRight: movilIpadaScreen ? '0.5rem' : '1rem',
                            }}
                          >
                            <Icon icon={icon} />
                          </ListItemIcon>
                          <ListItemText
                            primary={title}
                            sx={{
                              color: 'var(--tp-common-white)',
                              textTransform: 'uppercase',
                              fontSize: '0.9rem',
                              margin: '0rem',
                              padding: '0rem',
                            }}
                          />
                          {open2 ? (
                            <ExpandLess
                              sx={{ color: 'var(--tp-common-white)' }}
                            />
                          ) : (
                            <ExpandMore
                              sx={{ color: 'var(--tp-common-white)' }}
                            />
                          )}
                        </ListItemButton>

                        <Collapse in={open2} timeout='auto' unmountOnExit>
                          <List component='div' disablePadding>
                            {recipeBook.map(({ url, nombre }, index) => (
                              <a
                                href={url}
                                target='_blank'
                                className='w-100'
                                key={index}
                              >
                                <ListItemButton
                                  sx={{ pl: 4 }}
                                  onClick={toggleDrawer('left', !openHeader)}
                                >
                                  <ListItemText
                                    primary={nombre}
                                    sx={{
                                      color: 'var(--tp-common-white)',
                                      textTransform: 'uppercase',
                                      fontSize: '0.9rem',
                                      margin: '0rem',
                                      padding: '0rem',
                                    }}
                                  />
                                </ListItemButton>
                              </a>
                            ))}
                          </List>
                        </Collapse>
                      </>
                    )}
                  </div>
                );
              })}

              {/* ondemand */}
              <ListItemButton
                onClick={handleClickOndemand}
                sx={{
                  borderBottom: '1px solid var(--tp-common-white)',
                  marginBottom: '0.5rem',
                  marginTop: '0.5rem',
                  padding: movilIpadaScreen ? '0.5rem' : '0.5rem',
                  svg: {
                    position: 'relative',
                    right: '-15px',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 'auto',
                    marginRight: movilIpadaScreen ? '0.5rem' : '1rem',
                  }}
                >
                  <Icon icon={icon9} />
                </ListItemIcon>
                <ListItemText
                  primary={'on-demand'}
                  sx={{
                    color: 'var(--tp-common-white)',
                    textTransform: 'uppercase',
                    fontSize: '0.9rem',
                    margin: '0rem',
                    padding: '0rem',
                  }}
                />
                {openOndemand ? (
                  <ExpandLess sx={{ color: 'var(--tp-common-white)' }} />
                ) : (
                  <ExpandMore sx={{ color: 'var(--tp-common-white)' }} />
                )}
              </ListItemButton>

              <Collapse in={openOndemand} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                  {videosOndemand.map(
                    ({ url, url_ingles, nombre, nombre_ingles }, index) => (
                      <a
                        href={`https://game.nutritionforummx.com/ondemand?title=${
                          user?.idioma === 1 ? nombre : nombre_ingles
                        }&url=${url}&urlIng=${url_ingles}&idioma=${
                          user?.idioma
                        }&user=${user?.name}&email=${user?.email}`}
                        className='w-100'
                        key={index}
                      >
                        <ListItemButton
                          sx={{ pl: 4 }}
                          onClick={toggleDrawer('left', !openHeader)}
                        >
                          <ListItemText
                            primary={
                              user?.idioma === 1 ? nombre : nombre_ingles
                            }
                            sx={{
                              color: 'var(--tp-common-white)',
                              textTransform: 'uppercase',
                              fontSize: '0.9rem',
                              margin: '0rem',
                              padding: '0rem',
                            }}
                          />
                        </ListItemButton>
                      </a>
                    )
                  )}
                </List>
              </Collapse>

              {/* endOndemand */}

              <ListItem
                disablePadding
                sx={{
                  borderBottom: '1px solid var(--tp-common-white)',
                  marginBottom: '0.5rem',
                  marginTop: '0.5rem',
                }}
              >
                <button
                  className='w-100'
                  onClick={() => setOpenCookies(!openCookies)}
                >
                  <ListItemButton
                    sx={{
                      minWidth: 'auto',
                      padding: movilIpadaScreen ? '0.5rem' : '0.5rem',
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 'auto',
                        marginRight: movilIpadaScreen ? '0.5rem' : '1rem',
                      }}
                    >
                      <Icon icon={icon8} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        user?.idioma === 1
                          ? 'configurar COOKIES'
                          : 'configure COOKIES'
                      }
                      sx={{
                        color: 'var(--tp-common-white)',
                        textTransform: 'uppercase',
                        fontSize: '0.9rem',
                        margin: '0rem',
                        padding: '0rem',
                      }}
                    />
                  </ListItemButton>
                </button>
              </ListItem>
            </List>
          </>
          <div className='w-100 footer d-flex align-items-center justify-content-center'>
            <button onClick={onLogoutClick}>
              {user?.idioma === 1 ? 'Cerrar Sesión' : 'Logout'}
            </button>
            <img className='img-fluid' src={LogoFooter} alt='logo danone' />
            <p>
              {user?.idioma === 1
                ? 'DANONE DE MÉXICO 2023 © TODOS LOS DERECHOS RESERVADOS 2023'
                : 'DANONE DE MEXICO 2023 © ALL RIGHTS RESERVED 2023'}
            </p>
          </div>
        </div>
      </div>
    </Box>
  );

  return (
    <ClickAwayListener onClickAway={() => handleClickCloseDrawer()}>
      <div>
        <div>
          <div className='content-header'>
            <button
              ref={buttonMenu}
              className='btn-header'
              aria-label='cerrar header'
              onClick={toggleDrawer('left', !openHeader)}
            >
              <img className='img-fluid' src={LogoHeader} alt='logo danone' />
              <img className='img-fluid' src={IconHeader} alt='header icon' />
            </button>
          </div>

          <Drawer
            anchor={'left'}
            open={state['left']}
            sx={{
              zIndex: '998 !important',
              width: movilIpadaScreen ? '200px' : '250px',
              '.MuiPaper-elevation': {
                height: movilIpadaScreen
                  ? 'calc(100% - 58px)'
                  : 'calc(100% - 85px)',
                bottom: 0,
                top: 'auto',
                backgroundColor: 'var(--tp-theme-1)',
              },
              '.MuiModal-backdrop': {
                zIndex: '998 !important',
                height: movilIpadaScreen
                  ? 'calc(100% - 58px)'
                  : 'calc(100% - 85px)',
                width: movilIpadaScreen ? '200px' : '250px',
                backgroundColor: 'rgb(0 0 0 / 0%)',
                top: 'auto',
                bottom: 0,
              },
              '.MuiDrawer-modal': {
                height: movilIpadaScreen
                  ? 'calc(100% - 58px)'
                  : 'calc(100% - 85px)',
                top: 'auto',
                bottom: 0,
              },
            }}
          >
            {list('left')}
          </Drawer>
        </div>
      </div>
    </ClickAwayListener>
  );
};
