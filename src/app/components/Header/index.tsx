import { AiOutlineSearch } from 'react-icons/ai';
import { MenuHeader } from '../MenuHeader';
import Image from 'next/image';

export const Header = () => {
  return (
    <div className=' w-full px-14  items-center h-[10vh] flex justify-between'>
      <div className='flex gap-4 items-center'>
        <MenuHeader />
      </div>

      <div>
        <Image src='/logo.png' alt='/logo.png' width={100} height={100} />
      </div>

      <div className='flex gap-6 items-center'>
        <div className='cursor-pointer flex gap-4'>
          <AiOutlineSearch size={25} />
          <span className='font-light text-xl'>Buscar</span>
        </div>
      </div>
    </div>
  );
};
