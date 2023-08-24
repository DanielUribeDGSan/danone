import { Navigate, Route, Routes } from 'react-router-dom';
import { Login } from '../screens/login/Login';
import { LoginIng } from '../screens/loginIng/Login';
import { Register } from '../screens/register/Register';
import { Confirmation } from '../screens/confirmation/Confirmation';
import { RegisterIng } from '../screens/registerIng/Register';
import { ChangePassword } from '../screens/changePassword/ChangePassword';

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path='/cambiar-password/:token' element={<ChangePassword />} />
      <Route path='/confirmacion' element={<Confirmation />} />
      <Route path='/iniciar-sesion' element={<Login />} />
      <Route path='/login' element={<LoginIng />} />
      <Route path='/registro' element={<Register />} />
      <Route path='/register' element={<RegisterIng />} />
      <Route path='/' element={<Login />} />
      <Route path='/*' element={<Navigate to='/iniciar-sesion' />} />
    </Routes>
  );
};
