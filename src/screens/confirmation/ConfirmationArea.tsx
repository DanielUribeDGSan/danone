import { ImagesFloats } from '../../components/confirmation/ImagesFloats';
import { Welcome } from '../../components/confirmation/Welcome';
import { useUser } from '../../hooks/useUser';

export const ConfirmationArea = () => {
  const { userData, isLoadingUser } = useUser();

  if (isLoadingUser) {
    return <p>Cargando...</p>;
  }

  return (
    <section className='confirmation-area d-flex align-items-center justify-content-center'>
      <div className='row m-0 p-0 h-100 d-flex align-items-center justify-content-center'>
        <div className='col-12 h-100 d-flex align-items-center'>
          <Welcome user={userData} />
        </div>
      </div>
      <ImagesFloats />
    </section>
  );
};
