'use client';

import { useRewardModal } from '@/app/hooks/modals/useModal';
import Modal from '../../Modal';
import { useEffect, useState } from 'react';
import { Reward, User_Rewards } from '@/app/types/ModelsType';
import { getRewards } from '@/app/services';
import toast from 'react-hot-toast';
import { RewardComponent } from '../../RewardComponent';
import usePrivateStore from '@/app/hooks/store/usePrivateStore';
import { RewardUserComponent } from '../../RewardUserComponent';
import { useWarningRewardModal } from '@/app/hooks/modals/useWarning';
import { ProgressBar } from '../../ProgressBar';
import { AnimationEmpty } from '../../Animations/AnimationEmpty';

enum STEPS {
  INVENTORY = 0,
  STORE = 1,
}

const RewardModal = () => {
  const [animatedPoints, setAnimatedPoints] = useState<number>(0);
  const [step, setStep] = useState(STEPS.INVENTORY);
  const [isActive, setIsActive] = useState<number | null>(null);
  const [selectedPointsRange, setSelectedPointsRange] = useState<
    [number, number] | null
  >(null);
  const [rewards, setRewards] = useState<[] | Reward[]>([]);

  const warningModal = useWarningRewardModal();
  const { user, userReward } = usePrivateStore();

  const rewardoOptions = [
    {
      mainText: 'Até 100',
      subText: 'Pontos',
      pointsRange: [0, 100] as [number, number],
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
    {
      mainText: '251 a 300',
      subText: 'Pontos',
      pointsRange: [251, 300] as [number, number],
    },
  ];
  const filterRewardsByPointsRange = () => {
    if (selectedPointsRange) {
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
    if (user) {
      if (user.points < reward.quantity_points) {
        return toast.error('Pontos insuficientes');
      }
      warningModal.setCurrentItem(reward);
      warningModal.onOpen();
    }
  };

  const handleCopyLink = (reward: User_Rewards) => {
    navigator.clipboard.writeText(reward.reward_code);
    toast.success('Copiado!');
  };

  let body = (
    <div className='flex flex-col gap-6 h-full'>
      <div className='flex items-center justify-between w-full sm:w-11/12 mx-auto '>
        <span className='text-3xl font-semibold'>
          {animatedPoints}
          <span className='font-medium text-base sm:text-xl'> Pontos</span>{' '}
        </span>

        <button
          className='px-2 md:px-4 py-1 border-2 border-red-500 rounded-3xl text-base whitespace-nowrap sm:text-lg font-semibold text-red-500'
          onClick={() => {
            setStep(1);
          }}
        >
          Resgatar recompensas
        </button>
      </div>

      <div className='w-11/12 mx-auto h-1/5'>
        <ProgressBar points={user?.points ?? 0} />
      </div>

      <div className='flex flex-wrap gap-8 justify-evenly h-4/5'>
        {userReward && userReward.length > 0 ? (
          userReward.map((reward, i) => (
            <RewardUserComponent
              reward={reward}
              key={i}
              onClick={handleCopyLink}
            />
          ))
        ) : (
          <div className='w-full h-4/5'>
            <AnimationEmpty text='Nenhuma recompensa resgatada' />
          </div>
        )}
      </div>
    </div>
  );

  if (step === STEPS.STORE) {
    body = (
      <div className='flex flex-col gap-6 h-full'>
        <div className='flex items-center justify-between w-full sm:w-11/12 mx-auto '>
          <span className='text-3xl font-semibold'>
            {user?.points}
            <span className='font-medium text-base sm:text-xl'>
              {' '}
              Pontos
            </span>{' '}
          </span>

          <button
            className='px-2 md:px-4 py-1 border-2 border-red-500 rounded-3xl text-base whitespace-nowrap sm:text-lg font-semibold text-red-500'
            onClick={() => {
              setStep(0);
            }}
          >
            Minhas recompensas
          </button>
        </div>

        <div className='flex gap-3 items-center justify-start sm:justify-around hiddenScroll overflow-auto '>
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

        <div className='flex flex-wrap gap-8 justify-evenly h-4/6'>
          {filterRewardsByPointsRange().map((reward, i) => (
            <RewardComponent reward={reward} key={i} onClick={catchReward} />
          ))}
        </div>
      </div>
    );
  }

  useEffect(() => {
    const targetPoints = user?.points || 0; // User's current points
    const animationDuration = 1000; // Animation duration in milliseconds

    const startAnimation = () => {
      let startTimestamp: number;
      const animate = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;

        const progress = timestamp - startTimestamp;
        const percentage = Math.min(progress / animationDuration, 1);

        const currentPoints = Math.floor(percentage * targetPoints);
        setAnimatedPoints(currentPoints);

        if (percentage < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    };

    startAnimation();
  }, [user?.points, rewardModal.isOpen]);

  useEffect(() => {
    fetchReward();
  }, []);
  return (
    <>
      <Modal
        onClose={rewardModal.onClose}
        body={body}
        title={
          step === STEPS.INVENTORY
            ? 'Minhas recompensas'
            : 'Resgatar recompensas'
        }
        isOpen={rewardModal.isOpen}
      />
    </>
  );
};

export default RewardModal;
