'use client';

import React, { useEffect, useState } from 'react';
import { AiOutlineArrowUp } from 'react-icons/ai';
import { handleSetSelected } from '@/app/utils';

export const ComeBack = () => {
  const [showArrow, setShowArrow] = useState(false);

  const handleScroll = () => {
    console.log('scroll y', window.scrollY);
    console.log('innerHeight', window.innerHeight);

    if (window.scrollY > window.innerHeight - 800) {
      setShowArrow(true);
    } else {
      setShowArrow(false);
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`w-8 sm:w-12 h-8 sm:h-12 rounded-full cursor-pointer ${
        showArrow ? 'fixed' : 'hidden'
      } bottom-8 right-8`}
    >
      <AiOutlineArrowUp
        className='w-full h-full'
        onClick={() => {
          handleSetSelected('hero');
        }}
      />
    </div>
  );
};
