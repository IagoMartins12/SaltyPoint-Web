import Image from 'next/image';
import { AppleButton, GoogleButton, OrderButton } from '../Buttons';

export const Hero = () => {
  return (
    <div className='w-full h-[40vh] lg:h-[60vh] flex justify-between'>
      <div className='w-10/12 lg:w-5/12 xl:w-4/12 mx-auto self-center flex flex-col items-center justify-center gap-12'>
        <div className='flex flex-col gap-6'>
          <span className='font-bold text-4xl xl:text-6xl'>
            A MELHOR PIZZA DA REGIÃO
          </span>
          <span className=' text-lg'>
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
            <div className='flex gap-6'>
              <AppleButton />
              <GoogleButton />
            </div>
          </div>
        </div>
      </div>
      <div className='hidden lg:flex w-6/12 relative'>
        <Image fill src='/hero.svg' alt='hero' />
      </div>
    </div>
  );
};
