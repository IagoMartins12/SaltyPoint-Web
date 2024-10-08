import React, { useState, useEffect } from 'react';
import { useLottie } from 'lottie-react';
import crown from '../../../animations/crown.json';
import crownDark from '../../../animations/crownDark.json';
import { AnimationCommponentProps } from '@/app/types/ComponentTypes';
import toast from 'react-hot-toast';
import { useTheme } from 'next-themes';

export const AnimationReward: React.FC<AnimationCommponentProps> = ({
  setHasPlayed,
  repeat = false,
}) => {
  const [hasPlayed2, setHasPlayed2] = useState(false);

  const { theme } = useTheme();
  const onCloseFunction = () => {
    toast.success('Recompensa resgatada');
    if (repeat) {
      setHasPlayed(false);
    }
  };
  const { View, play } = useLottie({
    animationData: theme === 'light' ? crown : crownDark,
    loop: false,
    autoplay: false,
    className: 'h-full w-full',
    onComplete: () => {
      onCloseFunction();
    },
  });

  useEffect(() => {
    if (!hasPlayed2) {
      play();
      setHasPlayed2(true);
    }
  }, [hasPlayed2, play]);

  return (
    <div
      className='h-full w-full flex items-center justify-center p-6'
      style={{ position: 'relative' }}
    >
      <div style={{ width: '100%', height: '100%', position: 'absolute' }}>
        {View}
      </div>
    </div>
  );
};
