'use client';

import { useRewardModal } from '@/app/hooks/modals/useModal';
import usePrivateStore from '@/app/hooks/store/usePrivateStore';
import { useEffect, useState } from 'react';
import { ProgressBar } from '../ProgressBar';

export const RewardOnHome = () => {
  const [animatedPoints, setAnimatedPoints] = useState<number>(0);

  const { user } = usePrivateStore();
  const rewardModal = useRewardModal();

  useEffect(() => {
    const targetPoints = user?.points || 0;
    const animationDuration = 1000;

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
  }, [user]);

  if (user) {
    return (
      <div className='flex flex-col w-11/12 mx-auto mt-4 sm:py-12'>
        <div className='flex items-center justify-between w-full'>
          <span className='text-3xl font-semibold'>
            {animatedPoints}
            <span className='font-medium text-base sm:text-xl'>
              {' '}
              Pontos
            </span>{' '}
          </span>

          <button
            className='px-4 py-1 border-2 border-red-500 rounded-3xl text-base whitespace-nowrap sm:text-lg font-semibold text-red-500'
            onClick={() => {
              rewardModal.onOpen();
            }}
          >
            Ver recompensas
          </button>
        </div>

        <ProgressBar points={animatedPoints} />
      </div>
    );
  } else {
    <></>;
  }
};
