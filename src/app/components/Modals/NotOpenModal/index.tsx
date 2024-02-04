import { useGeneralDataModal } from '@/app/hooks/modals/useModal';
import useGlobalStore from '@/app/hooks/store/useGlobalStore';
import { ModalWarning } from '../../ModalWarning';
import { AnimationClosed } from '../../Animations/AnimationClosed';

export const NotOpenModal = () => {
  const generalDataModal = useGeneralDataModal();
  const { generalData } = useGlobalStore();
  const body = (
    <div className='flex flex-col h-full w-full'>
      <div className='h-3/6 sm:h-4/6'>
        <AnimationClosed />
      </div>
      <div className='h-3/6 sm:h-2/6 flex flex-col items-center justify-center gap-2'>
        <h1 className='text-3xl font-semibold'>Oops!</h1>

        <p className='font-light text-lg text-center'>
          Nesse momento, não estamos atendendo.
        </p>

        {generalData?.isOpening === true ? (
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
        )}
      </div>
    </div>
  );

  return (
    <>
      <ModalWarning
        onClose={generalDataModal.onClose}
        body={body}
        isOpen={generalDataModal.isOpen}
      />
    </>
  );
};
