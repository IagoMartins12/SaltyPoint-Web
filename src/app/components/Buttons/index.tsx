import { AuthButton } from '@/app/types/ComponentTypes';
import { AiFillApple } from 'react-icons/ai';
import { FaGooglePlay } from 'react-icons/fa';

export const AppleButton = () => {
  return (
    <button className='px-4 py-2 flex gap-2 items-center w-full sm:w-auto justify-center rounded-xl bg-black text-white '>
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
    <button className='px-4 py-2 flex gap-2 items-center justify-center w-full sm:w-auto rounded-xl  bg-white text-black border-2 border-black '>
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

export const AuthLoginButton: React.FC<AuthButton> = ({
  bgColor,
  icon: Icon,
  text,
  onClick,
}) => {
  return (
    <div className='px-6 sm:px-0 w-full'>
      <button
        type='button'
        onClick={onClick}
        className={`text-white text-base font-semibold w-full ${bgColor} rounded-lg  px-5 py-2.5 text-center  items-center justify-center gap-4 flex mr-2 mb-2`}
      >
        {Icon && <Icon size={25} />}
        <span className='text-center pl-4'>{text}</span> <div></div>
      </button>
    </div>
  );
};

export const AuthLoginButtonRounded: React.FC<AuthButton> = ({
  bgColor,
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`text-white text-base flex items-center justify-center font-semibold w-12 h-12 ${bgColor} rounded-full`}
    >
      {Icon && <Icon size={30} />}
    </button>
  );
};

export const OrderButton = () => {
  return (
    <button
      type='button'
      className='border-2 px-5 py-5 border-white text-white rounded-full bg-red-800'
    >
      <span> Comprar online</span>
    </button>
  );
};
