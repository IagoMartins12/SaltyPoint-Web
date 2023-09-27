import useAppDownload from '@/app/hooks/modals/useAppDownload';
import { IoCloseOutline } from 'react-icons/io5';
import { AppleButton, GoogleButton } from '../../Buttons';

export const AppDownloadModal = () => {
  const appModal = useAppDownload();

  return (
    <div
      className={`menuModalsPosition rounded-md gap-3 modalsBackground flex-col z-50 flex ${
        appModal.isOpen ? 'modal-open' : 'modal-closed'
      }`}
    >
      <div className='flex items-center justify-center w-full py-3'>
        <span className='font-semibold text-xl text-center'>
          Baixe nosso aplicativo{' '}
        </span>
      </div>
      <IoCloseOutline
        className='absolute top-2 left-2'
        size={30}
        onClick={() => appModal.onClose()}
        style={{ cursor: 'pointer' }}
      />

      <div className='flex flex-col gap-6 w-10/12 mx-auto'>
        <div className='flex flex-col  gap-12'>
          <span className='font-medium text-lg'>
            Ao baixar nosso aplicativo você terá a melhor experiência de compra
            com acesso a promoções exclusivas, notificações dos seus pedidos,
            cupons promocionais e muito mais.
          </span>

          <span className='font-medium text-lg'>
            Clique no link abaixo para efetuar o download diretamente da sua
            loja de aplicativos
          </span>
        </div>

        <div className=' flex gap-6 items-center justify-center my-12'>
          <AppleButton />
          <GoogleButton />
        </div>
      </div>
    </div>
  );
};
