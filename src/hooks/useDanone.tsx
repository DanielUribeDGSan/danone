import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { RegisterUser } from '../interfaces/RegisterUser';
import { FormValuesLogin } from '../interfaces/loginForm';
import danoneApi from '../api/danoneApi';
import {
  add_user,
  sign_out,
  update_image,
  update_image_user,
} from '../redux/features/auth-slice';
import { User } from '../interfaces/auth';
import { useState } from 'react';
import { Programam } from '../interfaces/Program';
import { Biographies } from '../interfaces/biographies';
import { RecipeBook } from '../interfaces/recipeBook';
import { Score } from '../interfaces/score';
import { Game } from '../interfaces/game';
import danoneApiImages from '../api/danoneApiImages';

interface Config {
  headers: object;
}

interface Response {
  msg: string;
  res: boolean;
  clave: number | string;
  user: User;
}

const config: Config = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    fetchOptions: {
      mode: 'no-cors',
    },
  },
};

const accesLogin = true;

export const useDanone = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [programData, setProgramData] = useState<Programam[]>([]);
  const [biographiesAllData, setBiographiesAllData] = useState<Biographies[]>(
    []
  );
  const [recipeBook, setRecipeBook] = useState<RecipeBook[]>([]);
  const [score, setScore] = useState<Score[]>([]);
  const [infoGame, setInfoGame] = useState<Game>({
    id: 0,
    nombre: '',
    descripcion: '',
    descripcion_ingles: '',
    imagen_informacion: '',
    terminos_y_condiciones: '',
    activo: 0,
    created_at: '',
    updated_at: '',
    url_infografia: '',
    infografia: '',
  });
  const [scoreYourPosicion, setScoreYourPosicion] = useState<Score>({
    name: '',
    apellidos: '',
    email: '',
    clave: '',
    score: 0,
    posicion: 0,
  });

  const [biographiesData, setBiographiesData] = useState<Biographies>({
    id: 0,
    nombre: '',
    titulo: '',
    imagen: '',
    formacion: '',
    resumen: '',
    idioma: 0,
    activo: 0,
    bandera: '',
  });

  const register = async (user: RegisterUser) => {
    try {
      const { data } = await danoneApi.post('/registro', user);
      const resp: Response = data;

      if (resp.res) {
        const userStore: User = {
          name: user?.nombre,
          apellidos: user?.apellidos,
          edad: user?.edad,
          email: user?.email,
          institucion: user?.institucion,
          nacionalidad: user?.nacionalidad,
          profesional: user?.profesional ? 1 : 0,
          especialidad: user?.especialidad,
          area_trabajo: user?.area_trabajo,
          idioma: user?.idioma,
          clave: resp.clave,
          image: '',
          profileImage: '',
          constancia: 0,
        };

        dispatch(add_user(userStore));

        navigate('/confirmacion');

        return { resp: true };
      } else {
        toast.error(resp?.msg, {
          position: 'top-left',
        });

        return { resp: false };
      }
    } catch (error) {
      toast.error(`Ocurrio un error - Intentalo más tarde`, {
        position: 'top-left',
      });
    }
  };

  const login = async (body: FormValuesLogin) => {
    try {
      const { data } = await danoneApi.post('/auth/login', body, config);
      const resp: Response = data;

      if (resp.res || resp.user) {
        const dataUser = data?.user;

        if (!accesLogin) {
          if (dataUser?.idioma === 1) {
            Swal.fire({
              title: 'Acceso correcto',
              text: '¡Te esperamos a partir del 5 de julio!',
              icon: 'success',
              confirmButtonText: 'Aceptar',
            });
          } else {
            Swal.fire({
              title: 'Correct access',
              text: '¡Join us on July 5!',
              icon: 'success',
              confirmButtonText: 'Accept',
            });
          }
        } else {
          const user: User = {
            name: dataUser?.name,
            apellidos: dataUser?.apellidos,
            edad: dataUser?.edad,
            email: dataUser?.email,
            institucion: dataUser?.institucion,
            nacionalidad: dataUser?.nacionalidad,
            profesional: dataUser?.profesional,
            especialidad: dataUser?.especialidad,
            area_trabajo: dataUser?.area_trabajo,
            idioma: dataUser?.idioma,
            clave: dataUser?.clave,
            image: dataUser?.imagen_book,
            profileImage: dataUser?.imagen_perfil,
            constancia: dataUser?.constancia,
          };

          dispatch(add_user(user));

          navigate('/inicio');
        }

        return { resp: true };
      } else {
        toast.error(resp?.msg, {
          position: 'top-left',
        });
        return { resp: false };
      }
    } catch (error) {
      toast.error('Ocurrio un error - Intentalo más tarde', {
        position: 'top-left',
      });
    }
  };

  const logout = (lenguage: number) => {
    dispatch(sign_out());
    lenguage === 1 ? navigate('/iniciar-sesion') : navigate('/login');
  };

  const getPrograms = async (lenguage: number) => {
    const { data } = await danoneApi.get(`/programa/${lenguage}`, config);

    setProgramData(data.programa);
  };

  const getAllBiographies = async (lenguage: number) => {
    const { data } = await danoneApi.get(`/biografias/${lenguage}`, config);

    setBiographiesAllData(data.biografias);
  };

  const getBiographies = async (lenguage: number, biographies: number) => {
    const { data } = await danoneApi.get(
      `/biografia/${biographies}/${lenguage}`,
      config
    );

    setBiographiesData(data.biografia);
  };

  const getAllRecipeBook = async () => {
    const { data } = await danoneApi.get('/recetario', config);

    setRecipeBook(data.recetarios);
  };

  const getScore = async (email: string, game: number) => {
    const { data } = await danoneApi.get(`/get-score/${email}/${game}`, config);
    const nameUserScore = data.tuscore?.name;
    if (nameUserScore) setScoreYourPosicion(data.tuscore);
    setScore(data.scores);
  };

  const getInfoGame = async (game: number) => {
    const { data } = await danoneApi.get(`/juego/${game}`, config);

    setInfoGame(data.juego);
  };

  const removeBgImage = async (
    imageFilePath: File,
    email: string,
    type: string
  ) => {
    const configImage: Config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
        fetchOptions: {
          mode: 'no-cors',
        },
      },
    };

    try {
      const formData = new FormData();
      formData.append('imagen', imageFilePath);
      formData.append('email', email);
      formData.append('tipo', type);

      const { data } = await danoneApiImages.post(
        '/photo-book/save',
        formData,
        configImage
      );

      if (type === 'P') {
        const imageData = { profileImage: data.url };
        dispatch(update_image_user(imageData));
      } else {
        const imageData = { image: data.url };
        dispatch(update_image(imageData));
      }

      // registerData(data, email);
    } catch (error) {
      console.log(error);
    }
  };

  const resetPassword = async (email: string, lenguage: number) => {
    try {
      const { data } = await danoneApi.post('/solicitud-recuperar-password', {
        email: email,
      });
      console.log(data?.res);

      if (data?.res === true) {
        if (lenguage === 1) {
          Swal.fire({
            title: 'Email enviado',
            text: 'Revisa tu correo electrónico y abre el link de recuperación de contraseña',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
        } else {
          Swal.fire({
            title: 'Email sent',
            text: 'Check your email address and open the password recovery link.',
            icon: 'success',
            confirmButtonText: 'Accept',
          });
        }
      } else {
        if (lenguage === 1) {
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error intentalo mas tarde',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'An error occurred try again later',
            icon: 'error',
            confirmButtonText: 'Accept',
          });
        }
      }
    } catch (error) {
      toast.error(`Ocurrio un error - Intentalo más tarde`, {
        position: 'top-left',
      });
    }
  };

  const changePassword = async (
    password: string,
    token: string,
    lenguage: number
  ) => {
    try {
      const { data } = await danoneApi.post('/actualizar-password', {
        token: token,
        password: password,
      });

      if (data?.res === true) {
        if (lenguage === 1) {
          Swal.fire({
            title: 'Contraseña actualizada',
            text: 'Tu contraseña ha sido actualizada',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
          navigate('/iniciar-sesion');
        } else {
          Swal.fire({
            title: 'Password updated',
            text: 'Your password has been updated',
            icon: 'success',
            confirmButtonText: 'Accept',
          });
          navigate('/login');
        }
      } else {
        if (lenguage === 1) {
          Swal.fire({
            title: 'Token vencido',
            text: 'El token ya venció',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        } else {
          Swal.fire({
            title: 'Token expired',
            text: 'The token has expired',
            icon: 'error',
            confirmButtonText: 'Accept',
          });
        }
      }
    } catch (error) {
      toast.error(`Ocurrio un error - Intentalo más tarde`, {
        position: 'top-left',
      });
    }
  };

  const getPercentages = async (email: string) => {
    const { data } = await danoneApi.get(
      `/analytic/porcentajes/${email}`,
      config
    );

    return data.pocentaje_ponencia;
  };

  const getOndemand = async () => {
    const { data } = await danoneApi.get('/ondemand', config);

    return data.videos;
  };

  return {
    register,
    login,
    logout,
    getPrograms,
    programData,
    getBiographies,
    biographiesData,
    getAllBiographies,
    biographiesAllData,
    getAllRecipeBook,
    recipeBook,
    getScore,
    score,
    scoreYourPosicion,
    getInfoGame,
    infoGame,
    removeBgImage,
    resetPassword,
    changePassword,
    getPercentages,
    getOndemand,
  };
};
