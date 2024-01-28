import React, { useState, useEffect } from 'react';
import { useLottie } from 'lottie-react';
import orderAnimation from '../../../animations/orderAnimation.json';
import { AnimationCommponentProps } from '@/app/types/ComponentTypes';
import toast from 'react-hot-toast';
import onSucess from '../../../animations/onSucess.json';

export const AnimationOrder: React.FC<AnimationCommponentProps> = ({
  setHasPlayed,
}) => {
  const [hasPlayed2, setHasPlayed2] = useState(false);
  const [animationData, setAnimationData] = useState<any>(orderAnimation);
  const secondAnimation = onSucess;
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    if (showSuccessToast) {
      toast.success('Pedido feito com sucesso!');
    }
  }, [showSuccessToast]);

  const { View, play, destroy } = useLottie({
    animationData: animationData,
    loop: false,
    autoplay: false,
    className: 'h-full w-full',
    onComplete: () => {
      setAnimationData(secondAnimation);
      setShowSuccessToast(true);

      if (!hasPlayed2) {
        play();
        setHasPlayed2(true);
      }
    },
  });

  useEffect(() => {
    play();

    if (!hasPlayed2) {
      setHasPlayed2(true);
    }

    return () => {
      // destroy(); // Limpa a animação quando o componente for desmontado
    };
  }, [hasPlayed2, play, destroy]);

  return (
    <div
      className='h-4/5 w-full flex items-center justify-center p-6'
      style={{ position: 'relative' }}
    >
      <div style={{ width: '100%', height: '100%', position: 'absolute' }}>
        {View}
      </div>
    </div>
  );
};
