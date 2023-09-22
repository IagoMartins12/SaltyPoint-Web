import { AiOutlineShoppingCart } from 'react-icons/ai';
import { MenuHeader } from '../MenuHeader';
import Image from 'next/image';
import { SearchIcon } from '../Icons';

export const Header = () => {
  return (
    <div className=' w-full px-14  items-center h-[10vh] flex justify-between'>
      <div className='flex gap-4 items-center'>
        <MenuHeader />
      </div>

      <div>
        <Image src='/logo.png' alt='/logo.png' width={80} height={80} />
      </div>

      <div className='flex gap-6 items-center'>
        <SearchIcon />
        <div className='cursor-pointer flex gap-4 relative'>
          <div className='z-10'>
            <AiOutlineShoppingCart size={25} />
          </div>
          {/* <span className='h-6 w-6 bottom-0 right-0 top-2 z-50 text-center  bg-red-700 absolute rounded-full'>
            1
          </span> */}
        </div>
      </div>
    </div>
  );
};
