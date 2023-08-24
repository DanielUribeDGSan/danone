interface Props {
  icon: string;
}

export const Icon = ({ icon }: Props) => {
  return (
    <img
      src={icon}
      style={{ width: '25px', height: '25px' }}
    />
  );
};
