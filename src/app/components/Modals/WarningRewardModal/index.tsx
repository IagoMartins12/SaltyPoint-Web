import toast from 'react-hot-toast';
import { ModalWarning } from '../../ModalWarning';
import { useWarningRewardModal } from '@/app/hooks/modals/useWarning';
import usePrivateStore from '@/app/hooks/store/usePrivateStore';
import { Reward } from '@/app/types/ModelsType';
import { CreateRewardDto } from '@/app/types/Dtos';
import { postReward } from '@/app/services';
import { AiOutlineWarning } from 'react-icons/ai';
import { useState } from 'react';
import { AnimationReward } from '../../AnimationReward';

export const WarningRewardModal: React.FC = () => {
  const [hasPlayed, setHasPlayed] = useState(false);

  const warningModal = useWarningRewardModal();
  const { user, setUser, setUserReward, userReward } = usePrivateStore();
  const handleCloseModal = () => {
    setHasPlayed(false);
    warningModal.onClose();
  };

  const catchReward = async (reward: Reward) => {
    if (user?.points) {
      if (user.points < reward.quantity_points) {
        return toast.error('Pontos insuficientes');
      }

      const object = {
        rewardId: reward.id,
      } as CreateRewardDto;
      const response = await postReward(object);

      if (response) {
        setHasPlayed(true);
        const updatedRewards = [...userReward, response];
        setUserReward(updatedRewards);
        const updatedPoints = user?.points - reward.quantity_points;
        const updatedUser = { ...user, points: updatedPoints }; //
        setUser(updatedUser);
      }
    }
  };

  let body = (
    <>
      <div className='w-full items-center flex justify-center flex-col gap-10'>
        <div className='w-24 h-24 rounded-full bg-yellow-300 items-center justify-center flex'>
          <AiOutlineWarning size={45} fill='black' />
        </div>
        <div className='flex flex-col items-center justify-center gap-3'>
          <h3 className='text-2xl  font-bold'>
            Resgatar {warningModal.currentItem?.name}
          </h3>

          {warningModal.currentItem ? (
            <span className=' text-base sm:text-lg font-medium'>
              Você está resgatando uma recompensa de{' '}
              {warningModal.currentItem.quantity_points} pontos
            </span>
          ) : null}
        </div>
        <div className='flex gap-4 w-full '>
          <button
            className='w-full py-3 bg-slate-200 rounded-2xl '
            onClick={() => {
              handleCloseModal();
            }}
          >
            <span className='font-semibold text-black text-sm sm:text-lg'>
              Cancelar
            </span>
          </button>
          <button
            className='w-full py-3 bg-red-500 rounded-2xl'
            onClick={() => {
              if (warningModal.currentItem) {
                catchReward(warningModal.currentItem);
              }
            }}
          >
            <span className='font-semibold text-white text-sm sm:text-lg'>
              Resgatar recompensa
            </span>
          </button>
        </div>
      </div>
    </>
  );

  if (hasPlayed) {
    body = (
      <div className='w-full h-full items-center flex justify-center flex-col gap-10'>
        <AnimationReward setHasPlayed={setHasPlayed} />
      </div>
    );
  }

  return (
    <ModalWarning
      onClose={handleCloseModal}
      body={body}
      isOpen={warningModal.isOpen}
      title='Resgatar recompensa'
    />
  );
};
