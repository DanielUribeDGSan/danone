import { VictoryPie, VictoryAnimation, VictoryLabel } from 'victory';
import { User } from '../../interfaces/auth';
import { useEffect } from 'react';
import { useDanone } from '../../hooks/useDanone';

interface Props {
  user: User;
  percentageP: number;
  setpercentageP: React.Dispatch<React.SetStateAction<number>>;
}

export const CircleChar = ({ user, setpercentageP, percentageP }: Props) => {
  const { getPercentages } = useDanone();

  useEffect(() => {
    let active = true;

    if (active && user?.email) {
      getPercentages(user?.email)
        .then((percentageObj) => {
          if (parseInt(percentageObj) >= 80) {
            setpercentageP(parseInt(percentageObj));
          } else {
            setpercentageP(parseInt(percentageObj) + 30);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }

    return () => {
      active = false;
    };
  }, [user?.email]);

  const percent = percentageP >= 100 ? 100 : percentageP;
  const data = [
    { x: 1, y: percent },
    { x: 2, y: 100 - percent },
  ];

  const percentMerk = 95;
  const dataMerk = [
    { x: 1, y: percentMerk },
    { x: 2, y: 100 - percentMerk },
  ];

  return (
    <div className='row w-100 p-0 m-0 d-flex align-items-center justify-content-center chars'>
      <div className='col-6 align-items-center justify-content-center'>
        <p>{user?.idioma === 1 ? 'PONENCIAS' : 'Lectures'}</p>
        <svg viewBox='0 0 400 400' width='100%' height='100%'>
          <VictoryPie
            standalone={false}
            animate={{ duration: 1000 }}
            width={400}
            height={400}
            data={data}
            innerRadius={120}
            cornerRadius={25}
            labels={() => null}
            style={{
              data: {
                fill: ({ datum }) => {
                  const color = '#ed544b';
                  return datum.x === 1 ? color : 'transparent';
                },
              },
            }}
          />
          <VictoryAnimation duration={1000} data={{ percent }}>
            {(newProps: any) => (
              <VictoryLabel
                textAnchor='middle'
                verticalAnchor='middle'
                x={200}
                y={200}
                text={`${Math.round(newProps.percent)}%`}
                style={{ fontSize: 80, fill: 'var(--tp-theme-1)' }}
              />
            )}
          </VictoryAnimation>
        </svg>
      </div>
      <div className='col-6 align-items-center justify-content-center'>
        <p>{user?.idioma === 1 ? 'MERCADITO' : 'MARKET'}</p>

        <svg viewBox='0 0 400 400' width='100%' height='100%'>
          <VictoryPie
            standalone={false}
            animate={{ duration: 1000 }}
            width={400}
            height={400}
            data={dataMerk}
            innerRadius={120}
            cornerRadius={25}
            labels={() => null}
            style={{
              data: {
                fill: ({ datum }) => {
                  const color = '#b51a65';
                  return datum.x === 1 ? color : 'transparent';
                },
              },
            }}
          />
          <VictoryAnimation duration={1000} data={{ percentMerk }}>
            {(newProps: any) => (
              <VictoryLabel
                textAnchor='middle'
                verticalAnchor='middle'
                x={200}
                y={200}
                text={`${Math.round(newProps.percentMerk)}%`}
                style={{ fontSize: 80, fill: 'var(--tp-theme-1)' }}
              />
            )}
          </VictoryAnimation>
        </svg>
      </div>
    </div>
  );
};
