import { AiFillApple } from 'react-icons/ai';
import { FaGooglePlay } from 'react-icons/fa';

export const AppleButton = () => {
  return (
    <button className='px-4 py-2 flex gap-2 items-center rounded-xl bg-black text-white '>
      <div className='w-10'>
        <AiFillApple size={35} fill='white' color='white' />
      </div>
      <div className=''>
        <div className='text-xs font-extrabold'>Baixar na</div>
        <div className='text-xl'>App Store</div>
      </div>
    </button>
  );
};

export const GoogleButton = () => {
  return (
    <button className='px-4 py-2 flex gap-2 items-center rounded-xl bg-white text-black border-2 border-black '>
      <div className='w-10'>
        <FaGooglePlay size={35} />
      </div>
      <div className=''>
        <div className='text-xs font-extrabold'>Disponivel na</div>
        <div className='text-xl'>Play Store</div>
      </div>
    </button>
  );
};
