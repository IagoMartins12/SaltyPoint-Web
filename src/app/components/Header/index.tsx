import { FaPizzaSlice } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import { LoginButton, RegisterButton } from '../Buttons/ClientButtons';

export const Header = () => {
  return (
    <div className=' w-full px-14  items-center h-[10vh] flex justify-between'>
      <div className='flex gap-4 items-center'>
        <span className='text-3xl font-semibold'>Salty Point</span>
        <FaPizzaSlice size={30} color='red' />
      </div>

      <div className='flex gap-6'>
        <div className='flex items-center relative'>
          <input
            type='text'
            placeholder='Pesquisar'
            className='px-4 py-2 border-2 rounded-md'
          />
          <AiOutlineSearch
            size={25}
            style={{ position: 'absolute', right: '1rem' }}
          />
        </div>
        <div className='flex gap-6'>
          <LoginButton />
          <RegisterButton />
        </div>
      </div>
    </div>
  );
};
