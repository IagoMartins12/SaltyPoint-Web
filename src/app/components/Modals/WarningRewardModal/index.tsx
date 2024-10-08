'use client';

import toast from 'react-hot-toast';
import { ModalWarning } from '../../ModalWarning';
import { useWarningRewardModal } from '@/app/hooks/modals/useWarning';
import usePrivateStore from '@/app/hooks/store/usePrivateStore';
import { Reward } from '@/app/types/ModelsType';
import { postReward } from '@/app/services';
import { AiOutlineWarning } from 'react-icons/ai';
import { RxDoubleArrowRight } from 'react-icons/rx';
import { PiCrownLight } from 'react-icons/pi';

import { useState } from 'react';
import { AnimationReward } from '../../Animations/AnimationReward';
import { BiDownArrowAlt } from 'react-icons/bi';
import Loader from '../../Loader';

const WarningRewardModal: React.FC = () => {
  const [loading, setLoading] = useState(false);
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
      };
      setLoading(true);

      const response = await postReward(object);

      if (response) {
        setLoading(false);
        setHasPlayed(true);
        const updatedRewards = [...userReward, response];
        setUserReward(updatedRewards);
        const updatedPoints = user?.points - reward.quantity_points;
        const updatedUser = { ...user, points: updatedPoints }; //
        setUser(updatedUser);
      } else {
        setLoading(false);
        toast.error('Erro ao resgatar recompensa');
      }
    }
  };

  let body = (
    <>
      <div className='w-full items-center flex justify-center flex-col gap-6 md:gap-10'>
        <div className='w-20 md:w-24 h-20 md:h-24 rounded-full bg-yellow-300 items-center justify-center flex'>
          <AiOutlineWarning size={45} fill='black' />
        </div>
        <div className='flex flex-col items-center justify-center gap-3'>
          <span className='text-xl text-center md:text-2xl font-semibold'>
            Resgatar {warningModal.currentItem?.name}
          </span>

          {warningModal.currentItem && user ? (
            <div className='flex items-center flex-col justify-center gap-4'>
              <span className='text-center text-base sm:text-lg font-medium'>
                Você está resgatando uma recompensa de{' '}
                {warningModal.currentItem.quantity_points} pontos
              </span>

              <div className='flex items-center justify-between w-8/12 mx-auto'>
                <div className='flex flex-col  items-center justify-center'>
                  <span className='font-base text-sm'>Saldo atual: </span>
                  <div className='flex items-center justify-start gap-2 w-full'>
                    <PiCrownLight size={20} />
                    <span className='font-semibold text-base'>
                      {user?.points}
                    </span>
                  </div>
                </div>

                <RxDoubleArrowRight size={27} />

                <div className='flex flex-col  items-center justify-center'>
                  <span className='font-base text-sm'>Saldo após: </span>
                  <div className='flex items-center justify-start gap-2 w-full'>
                    <div className='flex'>
                      <BiDownArrowAlt fill='red' size={20} />
                      <PiCrownLight size={20} />
                    </div>

                    <span className='font-semibold text-base'>
                      {user?.points - warningModal.currentItem.quantity_points}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className='flex flex-col md:flex-row gap-4 w-full '>
          <button
            className='w-full py-[0.40rem] md:py-3 bg-slate-200 rounded-2xl '
            onClick={() => {
              handleCloseModal();
            }}
          >
            <span className='font-semibold text-black text-sm sm:text-lg'>
              Cancelar
            </span>
          </button>
          <button
            disabled={loading ? true : false}
            className='w-full py-[0.40rem] md:py-3 bg-red-500 rounded-2xl'
            onClick={() => {
              if (warningModal.currentItem) {
                catchReward(warningModal.currentItem);
              }
            }}
          >
            <span className='font-semibold text-white text-sm sm:text-lg'>
              {loading ? <Loader isMin /> : 'Resgatar recompensa'}
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

export default WarningRewardModal;
