import { useAppDownload } from '@/app/hooks/modals/useModal';
import { AppleButton, GoogleButton } from '../../Buttons';
import Modal from '../Modal';

export const AppDownloadModal = () => {
  const appModal = useAppDownload();

  const body = (
    <div className='flex flex-col gap-6 w-11/12 mx-auto'>
      <div className='flex flex-col  gap-12'>
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

      <div className=' flex gap-6 items-center justify-center my-12'>
        <AppleButton />
        <GoogleButton />
      </div>
    </div>
  );

  return (
    <>
      <Modal
        onClose={appModal.onClose}
        body={body}
        isOpen={appModal.isOpen}
        title='Baixe nosso App!'
      />
    </>
  );
};
