'use client';

import { MenuHeader } from '../MenuHeader';
import Image from 'next/image';
import { SearchIcon } from '../Icons';
import { CartIcon } from '../CartIcon';

export const Header = () => {
  return (
    <div className=' w-full px-2 sm:px-14 sticky items-center h-[10vh] flex justify-between menuBackground top-[-5px]'>
      <div className='flex gap-4 items-center'>
        <MenuHeader />
      </div>

      <div>
        <Image
          src='/logo.png'
          alt='logo'
          width={80}
          height={80}
          className='!w-[55px] sm:!w-[80px] !h-[55px] sm:!h-[80px] '
        />
      </div>

      <div className='flex sm:gap-6 items-center'>
        <SearchIcon />
        <CartIcon />
      </div>
    </div>
  );
};
