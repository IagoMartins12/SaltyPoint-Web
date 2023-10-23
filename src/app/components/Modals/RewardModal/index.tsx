import { useRewardModal } from '@/app/hooks/modals/useModal';
import Modal from '../../Modal';
import { useEffect, useState } from 'react';
import { Reward } from '@/app/types/ModelsType';
import { getRewards } from '@/app/services';
import toast from 'react-hot-toast';
import { RewardComponent } from '../../RewardComponent';

export const RewardModal = () => {
  const [rewards, setRewards] = useState<[] | Reward[]>([]);

  const fetchReward = async () => {
    const response = await getRewards();

    if (response) {
      return setRewards(response);
    }

    toast.error('Erro ao carregar recompensas ');
  };
  const rewardModal = useRewardModal();

  useEffect(() => {
    fetchReward();
  }, []);

  console.log('rewarded reward', rewards);

  const body = (
    <div className='flex flex-col gap-6 h-full'>
      <div className='flex gap-8 items-center justify-center '>
        <div className='flex flex-col items-center'>
          <span className='text-center'>
            Até 50 <br />
            Pontos
          </span>
        </div>

        <div className='flex flex-col items-center'>
          <span className='text-center'>
            51 a 100 <br /> Pontos
          </span>
        </div>

        <div className='flex flex-col items-center'>
          <span className='text-center'>
            101 a 150 <br /> Pontos
          </span>
        </div>

        <div className='flex flex-col items-center'>
          <span className='text-center'>
            151 a 200 <br /> Pontos
          </span>
        </div>

        <div className='flex flex-col items-center'>
          <span className='text-center'>
            201 a 250 <br /> Pontos
          </span>
        </div>
      </div>

      <div className='flex flex-wrap gap-8 justify-center h-4/6'>
        {rewards &&
          rewards.map((reward, i) => (
            <RewardComponent reward={reward} key={i} />
          ))}
      </div>
    </div>
  );

  return (
    <>
      <Modal
        onClose={rewardModal.onClose}
        body={body}
        title='Minhas recompensaas'
        isOpen={rewardModal.isOpen}
      />
    </>
  );
};
