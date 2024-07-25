'use client';

import { PuffLoader } from 'react-spinners';

interface LoaderProps {
  isMin?: boolean;
}
const Loader: React.FC<LoaderProps> = ({ isMin = false }) => {
  return (
    <div
      className={`${
        !isMin ? 'h-[70vh]' : ''
      } flex flex-col justify-center items-center `}
    >
      <PuffLoader
        size={!isMin ? 100 : 23}
        color={`${!isMin ? 'red' : 'white'}`}
      />
    </div>
  );
};

export default Loader;
