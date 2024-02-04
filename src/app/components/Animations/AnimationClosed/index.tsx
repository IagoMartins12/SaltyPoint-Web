'use client';

import React, { useState, useEffect } from 'react';
import { useLottie } from 'lottie-react';
import closed from '../../../animations/closed.json';

export const AnimationClosed = () => {
  const [hasPlayed2, setHasPlayed2] = useState(false);

  const { View, play } = useLottie({
    animationData: closed,
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
    <div className=' h-full w-full flex items-center justify-center'>
      {View}
    </div>
  );
};
