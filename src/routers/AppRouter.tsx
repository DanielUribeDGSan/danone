import { BrowserRouter as Router } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { PublicRoutes } from './PublicRoutest';
import { PrivateRoutes } from './PrivateRoutes';

const AppRouter = () => {
  const { userData, isLoadingUser } = useUser();

  if (isLoadingUser) {
    return <p>Cargando...</p>;
  }

  return (
    <Router>{userData.email ? <PrivateRoutes /> : <PublicRoutes />}</Router>
  );
};

export default AppRouter;
