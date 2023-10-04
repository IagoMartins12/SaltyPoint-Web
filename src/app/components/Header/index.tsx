import { MenuHeader } from '../MenuHeader';
import Image from 'next/image';
import { SearchIcon } from '../Icons';
import { Cart } from '../Cart';
import { CartIcon } from '../CartIcon';

export const Header = () => {
  return (
    <div className=' w-full px-14 sticky items-center h-[10vh] flex justify-between'>
      <div className='flex gap-4 items-center'>
        <MenuHeader />
      </div>

      <div>
        <Image src='/logo.png' alt='/logo.png' width={80} height={80} />
      </div>

      <div className='flex gap-6 items-center'>
        <SearchIcon />
        <CartIcon />
      </div>
    </div>
  );
};
