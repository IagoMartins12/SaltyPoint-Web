'use client';

import { AiOutlineQuestionCircle, AiOutlineSearch } from 'react-icons/ai';
import { AppleButton, GoogleButton } from '../Buttons';
import { ImageComponent } from '../ImageComponent';
import {
  useFidelityModal,
  useGeneralDataModal,
  useSearchModal,
} from '@/app/hooks/modals/useModal';
import useGlobalStore from '@/app/hooks/store/useGlobalStore';
import usePrivateStore from '@/app/hooks/store/usePrivateStore';
import { useGeneralDataInfo } from '@/app/hooks/generalData';
import { useEffect } from 'react';

export const Hero = () => {
  return (
    <div className='w-11/12 mx-auto h-[55vh] sm:h-[40vh] lg:h-[50vh] hidden sm:flex justify-between'>
      <div className='w-10/12 lg:w-5/12 xl:w-8/12 mx-auto self-center flex flex-col items-center justify-center gap-12'>
        <div className='flex flex-col gap-6'>
          <span className='font-bold text-2xl md:text-4xl xl:text-6xl text-center sm:text-inherit'>
            A MELHOR PIZZA DA REGIÃO
          </span>
          <span className='text-base  md:text-lg '>
            Desfrute da melhor pizza da região com a conveniência de fazer seu
            pedido diretamente através do nosso website, ou experimente a
            facilidade de baixar o nosso aplicativo.
          </span>
        </div>

        <div className='flex w-full items-center justify-center'>
          <div className='flex flex-col gap-3 w-full'>
            <span className='text-lg font-semibold underline'>
              Baixe nosso app:
            </span>
            <div className='flex flex-col sm:flex-row gap-6'>
              <AppleButton />
              <GoogleButton />
            </div>
          </div>
        </div>
      </div>
      <div className='hidden lg:flex w-4/12 -z-10 relative'>
        <ImageComponent src='hero.svg' alt='hero' />
      </div>
    </div>
  );
};

export const Hero2 = () => {
  const searchModal = useSearchModal();
  return (
    <div className='flex flex-col w-11/12 mx-auto my-6 gap-6' id='hero'>
      {/* <div className='flex flex-col gap-3 w-10/12'>
        <span className='font-semibold text-3xl '>
          Peça as pizzas mais deliciosas da região
        </span>
        <span className='font-semibold text-3xl text-red-500'>
          Em 40 Minutos
        </span>
      </div> */}

      <div
        className=' flex w-full mx-auto  '
        onClick={() => {
          searchModal.onOpen();
        }}
      >
        <div className='relative -z-10 w-full'>
          <input
            type='text'
            className='w-full px-12 py-[0.65rem]  rounded-2xl border-2 bg-gray-200 '
            placeholder='Pesquise seus sabores preferidos'
          />
          <AiOutlineSearch
            size={30}
            className='left-2 top-2 absolute cursor-pointer'
          />
        </div>
      </div>
    </div>
  );
};

export const Hero3 = () => {
  const { user } = usePrivateStore();
  const { systemOpening } = useGeneralDataInfo();
  const generalDataModal = useGeneralDataModal();
  const fidelityModal = useFidelityModal();

  useEffect(() => {
    if (systemOpening === false) {
      generalDataModal.onOpen();
    }
  }, [systemOpening]);

  if (!user) {
    return (
      <div></div>
      // <div
      //   className='flex flex-col w-11/12 mx-auto my-4 sm:my-2 gap-2'
      //
      // >
      //   <p className='text-3xl font-normal'>
      //     Faça o login para ver os seus pontos
      //   </p>
      // </div>
    );
  }

  return (
    <div className='flex flex-col w-11/12 mx-auto my-4 sm:my-8 gap-2'>
      <p className='text-3xl font-normal'>
        Olá, <span className='font-semibold'>{user.name}</span>
      </p>

      <div className='flex gap-5 items-center'>
        <p className='text-xl font-normal'>
          Você possui: <span className='text-3xl '> {user.points} Pontos</span>
        </p>

        <div
          className='cursor-pointer'
          onClick={() => {
            fidelityModal.onOpen();
          }}
        >
          <AiOutlineQuestionCircle size={25} />
        </div>
      </div>
    </div>
  );
};
