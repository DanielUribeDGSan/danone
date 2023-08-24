import { useParams } from 'react-router-dom';
import { ChangePasswordContent } from '../../components/changePassword/ChangePasswordContent';
import { useEffect, useState } from 'react';

export const ChangePassword = () => {
  const { token } = useParams();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const adjustSize = () => {
        setHeight(window.innerHeight);
      };

      window.addEventListener('resize', adjustSize);
      adjustSize();

      return () => {
        window.removeEventListener('resize', adjustSize);
      };
    }
  }, []);

  return (
    <div
      className='d-flex align-items-center justify-content-center'
      style={{ height: height }}
    >
      {token && <ChangePasswordContent token={token} />}
    </div>
  );
};
