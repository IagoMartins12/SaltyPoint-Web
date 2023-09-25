import useAppDownload from '@/app/hooks/modals/useAppDownload';
import { useTheme } from 'next-themes';
import { IoCloseOutline } from 'react-icons/io5';
import { AppleButton, GoogleButton } from '../../Buttons';

export const AppDownloadModal = () => {
  const { theme } = useTheme();
  const appModal = useAppDownload();

  return (
    <div
      className={`menuModalsPosition rounded-md gap-6 ${
        theme === 'light' ? 'bg-white' : 'bg-black'
      }  flex-col z-50 flex ${appModal.isOpen ? 'modal-open' : 'modal-closed'}`}
    >
      <div className='flex items-center justify-between ml-5 mt-2'>
        <IoCloseOutline
          size={30}
          onClick={() => appModal.onClose()}
          style={{ cursor: 'pointer' }}
        />
      </div>
      <span className='text-3xl font-semibold mx-auto w-10/12 text-center'>
        Baixe nosso aplicativo
      </span>

      <div className='flex flex-col mx-auto w-10/12 gap-12'>
        <span className='font-medium text-lg'>
          Ao baixar nosso aplicativo você terá a melhor experiência de compra
          com acesso a promoções exclusivas, notificações dos seus pedidos,
          cupons promocionais e muito mais.
        </span>

        <span className='font-medium text-lg'>
          Clique no link abaixo para efetuar o download diretamente da sua loja
          de aplicativos
        </span>
      </div>

      <div className='mx-auto w-10/12 flex gap-6 items-center justify-center my-12'>
        <AppleButton />
        <GoogleButton />
      </div>
    </div>
  );
};
