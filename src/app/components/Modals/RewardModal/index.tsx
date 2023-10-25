import { useRewardModal } from '@/app/hooks/modals/useModal';
import Modal from '../../Modal';
import { useEffect, useState } from 'react';
import { Reward } from '@/app/types/ModelsType';
import { getRewards, postReward } from '@/app/services';
import toast from 'react-hot-toast';
import { RewardComponent } from '../../RewardComponent';
import usePrivateStore from '@/app/hooks/store/usePrivateStore';
import { CreateRewardDto } from '@/app/types/Dtos';
import { RewardUserComponent } from '../../RewardUserComponent';

enum STEPS {
  INVENTORY = 0,
  STORE = 1,
}

export const RewardModal = () => {
  const [step, setStep] = useState(STEPS.INVENTORY);
  const [isActive, setIsActive] = useState<number | null>(null);

  const [rewards, setRewards] = useState<[] | Reward[]>([]);
  const { user, setUser, userReward, setUserReward } = usePrivateStore();
  const rewardoOptions = [
    {
      mainText: 'Até 50',
      subText: 'Pontos',
    },
    {
      mainText: '51 a 100',
      subText: 'Pontos',
    },
    {
      mainText: '101 a 150',
      subText: 'Pontos',
    },
    {
      mainText: '151 a 200',
      subText: 'Pontos',
    },
    {
      mainText: '201 a 250',
      subText: 'Pontos',
    },
  ];
  const fetchReward = async () => {
    const response = await getRewards();
    if (response) {
      return setRewards(response);
    }

    toast.error('Erro ao carregar recompensas ');
  };
  const rewardModal = useRewardModal();

  const catchReward = async (reward: Reward) => {
    if (user?.points) {
      const updatedPoints = user?.points - reward.quantity_points;

      const updatedUser = { ...user, points: updatedPoints }; //
      console.log(updatedUser);
      setUser(updatedUser);

      const object = {
        rewardId: reward.id,
      } as CreateRewardDto;
      const response = await postReward(object);

      if (response) {
        const updatedRewards = [...userReward, response];
        // setUserReward(updatedRewards);
        toast.success('Recompensa resgatada');
      }

      console.log('response: ', response);
    }
  };
  useEffect(() => {
    fetchReward();
  }, []);

  let body = (
    <div className='flex flex-col gap-6 h-full'>
      <div className='flex items-center justify-between w-10/12 mx-auto '>
        <span className='text-3xl font-semibold'>
          {user?.points} <span className='font-medium text-2xl'> Pontos</span>
        </span>

        <button
          className='px-4 py-1 border-2 border-red-500 rounded-3xl text-lg font-semibold text-red-500'
          onClick={() => {
            setStep(1);
          }}
        >
          Ver recompensas
        </button>
      </div>

      <div className='flex flex-wrap gap-8 justify-center h-4/6'>
        {userReward &&
          userReward.map((reward, i) => (
            <RewardUserComponent reward={reward} key={i} />
          ))}
      </div>
    </div>
  );

  if (step === STEPS.STORE) {
    body = (
      <div className='flex flex-col gap-6 h-full'>
        <div className='flex items-center justify-between w-10/12 mx-auto '>
          <span className='text-3xl font-semibold'>
            {user?.points} <span className='font-medium text-2xl'> Pontos</span>{' '}
          </span>

          <button
            className='px-4 py-1 border-2 border-red-500 rounded-3xl text-lg font-semibold text-red-500'
            onClick={() => {
              setStep(0);
            }}
          >
            Minhas recompensas
          </button>
        </div>
        <div className='flex gap-4 items-center justify-center '>
          {rewardoOptions.map((op, i) => (
            <div
              className={`flex flex-col items-center border-2 border-red-500 py-2 px-2 rounded-lg cursor-pointer ${
                isActive === i ? 'bg-red-500' : ''
              } `}
              key={i}
              onClick={() => {
                isActive === i ? setIsActive(null) : setIsActive(i);
              }}
            >
              <span
                className={`text-center ${
                  isActive === i ? 'text-white' : 'text-red-500'
                } `}
              >
                {op.mainText} <br />
                {op.subText}
              </span>
            </div>
          ))}
        </div>

        <div className='flex flex-wrap gap-8 justify-center h-4/6'>
          {rewards &&
            rewards.map((reward, i) => (
              <RewardComponent reward={reward} key={i} onClick={catchReward} />
            ))}
        </div>
      </div>
    );
  }
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
