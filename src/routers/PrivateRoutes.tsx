import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Home } from '../screens/home/Home';
import { Stand } from '../screens/stand/Stand';
import { Program } from '../screens/program/Program';
import { Confirmation } from '../screens/confirmation/Confirmation';
import { Biographies } from '../screens/biographies/Biographies';
import { Live } from '../screens/live/Live';
import { StandPurple } from '../screens/standPurple/Stand';
import { Memorama } from '../screens/memorama/Memorama';
import { Auditorium } from '../screens/auditorium/Auditorium';
import { Profile } from '../screens/profile/Profile';
import { Probioticos } from '../screens/probioticos/Probioticos';
import { CrasyRoad } from '../screens/crasyRoad/CrasyRoad';
import { StandGreen } from '../screens/standGreen/Stand';
import { StandOrange } from '../screens/standOrange/Stand';
import { PhotoBooth } from '../screens/photobooth/PhotoBooth';

export const PrivateRoutes = () => {
  const location = useLocation();

  return (
    <Routes>
      <Route path='/photoBooth' element={<PhotoBooth />} />
      <Route path='/perfil' element={<Profile />} />
      <Route path='/auditorio' element={<Auditorium />} />
      <Route path='/crasy-road' element={<CrasyRoad />} />
      <Route path='/probioticos' element={<Probioticos />} />
      <Route path='/memorama' element={<Memorama />} />
      <Route path='/confirmacion' element={<Confirmation />} />
      <Route path='/mercadito' element={<Stand />} />
      <Route path='/nutricion-personalizada' element={<StandPurple />} />
      <Route path='/microbiota-y-probioticos' element={<StandGreen />} />
      <Route path='/flexitarianismo' element={<StandOrange />} />
      <Route path='/programa' element={<Program />} />
      <Route path='/biografia/:biografiaId' element={<Biographies />} />
      <Route path='/en-vivo' element={<Live />} />
      <Route path='/inicio' element={<Home />} />
      {location.pathname !== '/registro' &&
        location.pathname !== '/register' && (
          <Route path='*' element={<Navigate to='/inicio' replace />} />
        )}
    </Routes>
  );
};
