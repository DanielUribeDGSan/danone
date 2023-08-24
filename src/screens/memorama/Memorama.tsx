import { useEffect } from 'react';
import { MemoramaArea } from './MemoramaArea';
import { useTitlePage } from '../../hooks/useTitlePage';

export const Memorama = () => {
  const { setPageTitle } = useTitlePage();
  useEffect(() => {
    setPageTitle('Danone - Memorama');
  }, []);
  return <MemoramaArea />;
};
