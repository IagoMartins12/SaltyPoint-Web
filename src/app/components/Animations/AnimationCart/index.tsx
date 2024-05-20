import React, { useState, useEffect } from 'react';
import { useLottie } from 'lottie-react';
import cartAnimation from '../../../animations/cartAnimation.json';
import { AnimationCommponentProps } from '@/app/types/ComponentTypes';
import toast from 'react-hot-toast';

export const AnimationCart: React.FC<AnimationCommponentProps> = ({
  setHasPlayed,
  repeat = false,
  text,
}) => {
  const [hasPlayed2, setHasPlayed2] = useState(false);

  const onCloseFunction = () => {
    if (text) {
      toast.success(text);
    } else {
      toast.success('Produto adicionado');
    }
    if (repeat) {
      setHasPlayed(false);
    }
  };
  const { View, play } = useLottie({
    animationData: cartAnimation,
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
