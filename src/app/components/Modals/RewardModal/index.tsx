import { useRewardModal } from '@/app/hooks/modals/useModal';
import Modal from '../../Modal';
import { useEffect, useState } from 'react';
import { Reward, User, User_Rewards } from '@/app/types/ModelsType';
import { getRewards, postReward } from '@/app/services';
import toast from 'react-hot-toast';
import { RewardComponent } from '../../RewardComponent';
import usePrivateStore from '@/app/hooks/store/usePrivateStore';
import { CreateRewardDto } from '@/app/types/Dtos';
import { RewardUserComponent } from '../../RewardUserComponent';
import { EmptyResult } from '../../EmptyResult';
import { useWarningRewardModal } from '@/app/hooks/modals/useWarning';

enum STEPS {
  INVENTORY = 0,
  STORE = 1,
}

export const RewardModal = () => {
  const [step, setStep] = useState(STEPS.INVENTORY);
  const [isActive, setIsActive] = useState<number | null>(null);
  const [selectedPointsRange, setSelectedPointsRange] = useState<
    [number, number] | null
  >(null);
  const [rewards, setRewards] = useState<[] | Reward[]>([]);

  const warningModal = useWarningRewardModal();
  const { user, setUser, userReward, setUserReward } = usePrivateStore();

  const rewardoOptions = [
    {
      mainText: 'Até 50',
      subText: 'Pontos',
      pointsRange: [0, 50] as [number, number],
    },
    {
      mainText: '51 a 100',
      subText: 'Pontos',
      pointsRange: [51, 100] as [number, number],
    },
    {
      mainText: '101 a 150',
      subText: 'Pontos',
      pointsRange: [101, 150] as [number, number],
    },
    {
      mainText: '151 a 200',
      subText: 'Pontos',
      pointsRange: [151, 200] as [number, number],
    },
    {
      mainText: '201 a 250',
      subText: 'Pontos',
      pointsRange: [201, 250] as [number, number],
    },
  ];
  const filterRewardsByPointsRange = () => {
    if (selectedPointsRange) {
      console.log('clicou');
      const [minPoints, maxPoints] = selectedPointsRange;
      return rewards.filter(
        reward =>
          reward.quantity_points >= minPoints &&
          reward.quantity_points <= maxPoints,
      );
    }
    return rewards;
  };

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
      warningModal.setCurrentItem(reward);
      warningModal.onOpen();
      // const updatedPoints = user?.points - reward.quantity_points;

      // if (user.points < reward.quantity_points) {
      //   return toast.error('Pontos insuficientes');
      // }

      // const updatedUser = { ...user, points: updatedPoints }; //
      // console.log(updatedUser);
      // setUser(updatedUser);

      // const object = {
      //   rewardId: reward.id,
      // } as CreateRewardDto;
      // const response = await postReward(object);

      // if (response) {
      //   const updatedRewards = [...userReward, response];
      //   setUserReward(updatedRewards);
      //   toast.success('Recompensa resgatada');
      // }

      // console.log('response: ', response);
    }
  };

  const handleCopyLink = (reward: User_Rewards) => {
    navigator.clipboard.writeText(reward.reward_code);
    toast.success('Copiado!');
  };

  useEffect(() => {
    fetchReward();
  }, []);

  let body = (
    <div className='flex flex-col gap-6 h-full'>
      <div className='flex items-center justify-between w-full sm:w-10/12 mx-auto '>
        <span className='text-3xl font-semibold'>
          {user?.points}{' '}
          <span className='font-medium text-base sm:text-xl'> Pontos</span>{' '}
        </span>

        <button
          className='px-4 py-1 border-2 border-red-500 rounded-3xl text-base whitespace-nowrap sm:text-lg font-semibold text-red-500'
          onClick={() => {
            setStep(1);
          }}
        >
          Ver recompensas
        </button>
      </div>

      <div className='flex flex-wrap gap-8 justify-center h-4/6'>
        {userReward && userReward.length > 0 ? (
          userReward.map((reward, i) => (
            <RewardUserComponent
              reward={reward}
              key={i}
              onClick={handleCopyLink}
            />
          ))
        ) : (
          <EmptyResult text='Nenhuma recompensa resgatada' />
        )}
      </div>
    </div>
  );

  if (step === STEPS.STORE) {
    body = (
      <div className='flex flex-col gap-6 h-full'>
        <div className='flex items-center justify-between w-full sm:w-10/12  mx-auto '>
          <span className='text-3xl font-semibold'>
            {user?.points}{' '}
            <span className='font-medium text-base sm:text-xl'> Pontos</span>{' '}
          </span>

          <button
            className='px-4 py-1 border-2 border-red-500 rounded-3xl text-base whitespace-nowrap sm:text-lg font-semibold text-red-500'
            onClick={() => {
              setStep(0);
            }}
          >
            Minhas recompensas
          </button>
        </div>
        <div className='flex gap-4 items-center justify-start sm:justify-center overflow-auto '>
          {rewardoOptions.map((op, i) => (
            <div
              className={`flex flex-col items-center border-2 border-red-500 py-2 px-2  rounded-lg cursor-pointer ${
                isActive === i ? 'bg-red-500' : ''
              } `}
              key={i}
              onClick={() => {
                if (isActive === i) {
                  // Deselect the option
                  setIsActive(null);
                  setSelectedPointsRange(null);
                } else {
                  setIsActive(i);
                  setSelectedPointsRange(op.pointsRange);
                }
              }}
            >
              <span
                className={`text-center text-sm  sm:text-base whitespace-nowrap ${
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
          {filterRewardsByPointsRange().map((reward, i) => (
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
