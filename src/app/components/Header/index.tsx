import { FaPizzaSlice } from 'react-icons/fa';
import { AiOutlineSearch, AiOutlineUser } from 'react-icons/ai';

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
          <button className='flex items-center gap-3 px-6 py-3 bg-white min-w-[7rem] rounded-xl shadow-md'>
            <AiOutlineUser size={25} />
            <span className='font-semibold text-xl text-black'> Login</span>
          </button>
          <button className='flex items-center gap-3 px-6 py-3 bg-black min-w-[7rem] rounded-xl shadow-md'>
            <span className='font-semibold text-lg  text-white'>
              Cadastre-se
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
