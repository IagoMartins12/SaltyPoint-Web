import React, { useState, useEffect } from 'react';
import { useLottie } from 'lottie-react';
import empty from '../../../animations/empty.json';

interface Props {
  text: string;
}
export const AnimationEmpty: React.FC<Props> = ({ text }) => {
  const [hasPlayed2, setHasPlayed2] = useState(false);

  const { View, play } = useLottie({
    animationData: empty,
    loop: true,
    autoplay: true,
  });

  useEffect(() => {
    if (!hasPlayed2) {
      play();
      setHasPlayed2(true);
    }
  }, [hasPlayed2, play]);

  return (
    <div className=' flex items-center justify-center p-4 sm:p-8 flex-col gap-8'>
      <div>{View}</div>

      <p className='text-lg font-semibold text-center'>{text}</p>
    </div>
  );
};
