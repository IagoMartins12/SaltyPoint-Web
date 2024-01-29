import { usePixModal } from '@/app/hooks/modals/useModal';
import useGlobalStore from '@/app/hooks/store/useGlobalStore';
import { ModalWarningMin } from '../../ModalWarningMin';

export const PixModal = () => {
  const pixModal = usePixModal();
  const { generalData } = useGlobalStore();

  const body = (
    <div className='flex flex-col h-full w-full'>
      {/* <div className='h-3/6 '>
        <AnimationClosed />
      </div> */}
      <div className='h-5/6 flex flex-col items-center justify-center gap-2'>
        <h1 className='text-lg sm:text-xl text-center font-semibold'>
          Para compras com pix, necessitamos que o cliente envie o comprovante
          da transação em nosso whatsapp
        </h1>

        <div className='flex gap-4 items-center justify-center w-full'>
          <p className='font-light text-lg text-end w-6/12'>Chave pix:</p>
          <p className='font-medium text-base w-6/12'>{generalData?.pixKey}</p>
        </div>

        <div className='flex gap-4 items-center justify-center w-full'>
          <p className='font-light text-lg text-end w-6/12'>Nome da chave:</p>
          <p className='font-medium text-base w-6/12'>{generalData?.pixName}</p>
        </div>

        {/* {generalData?.isOpening === true ? (
          <p className='font-light text-lg text-center'>
            Nosso horario de atendimento é das{' '}
            <span className='font-semibold'> {generalData?.openingHours}</span>{' '}
            as{' '}
            <span className='font-semibold'>
              {' '}
              {generalData?.closingHours.replace('24', '00')}
            </span>
          </p>
        ) : (
          <p className='font-light text-lg text-center'>
            Estamos passando por manutenção, pedimos que aguarde ou entre em
            contato com algum dos nossos numeros
          </p>
        )} */}
      </div>
    </div>
  );

  return (
    <>
      <ModalWarningMin
        onClose={pixModal.onClose}
        body={body}
        isOpen={pixModal.isOpen}
      />
    </>
  );
};
