import { useEffect } from 'react';
import { ProbioticosArea } from './ProbioticosArea';
import { useTitlePage } from '../../hooks/useTitlePage';

export const Probioticos = () => {
  const { setPageTitle } = useTitlePage();
  useEffect(() => {
    setPageTitle('Danone - Probioticos');
  }, []);
  return <ProbioticosArea />;
};
