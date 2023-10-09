'use client';

import { useLoginModal, useRegisterModal } from '@/app/hooks/modals/useModal';
import { AiOutlineUser } from 'react-icons/ai';

export const LoginButton = () => {
  const loginModal = useLoginModal();
  return (
    <button className='flex items-center gap-3 px-6 py-3 bg-white min-w-[7rem] rounded-xl shadow-md'>
      <AiOutlineUser size={25} />
      <span
        className='font-semibold text-xl text-black'
        onClick={() => {
          loginModal.onOpen();
        }}
      >
        Login
      </span>
    </button>
  );
};

export const RegisterButton = () => {
  const registerModal = useRegisterModal();
  return (
    <button className='flex items-center gap-3 px-6 py-3 bg-black min-w-[7rem] rounded-xl shadow-md'>
      <span
        className='font-semibold text-lg  text-white'
        onClick={() => {
          registerModal.onOpen();
        }}
      >
        Cadastre-se
      </span>
    </button>
  );
};
