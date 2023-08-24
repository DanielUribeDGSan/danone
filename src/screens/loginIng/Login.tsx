import { useEffect } from 'react';
import { LoginAreaIng } from './LoginArea';
import { useTitlePage } from '../../hooks/useTitlePage';
import { AddMeta } from '../../components/ui/meta/AddMeta';

export const LoginIng = () => {
  const { setPageTitle } = useTitlePage();
  useEffect(() => {
    setPageTitle('Nutrition forum');
  }, []);

  return (
    <>
      <AddMeta
        title='Nutrition forum'
        description='Evento Nutrition forum mx - durante los días 6 y 7 de julio distinguidos especialistas mexicanos y extranjeros abordarán los últimos hallazgos en temas de salud y nutrición'
      />
      <LoginAreaIng />
    </>
  );
};
