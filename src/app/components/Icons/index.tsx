'use client';

import useSearchModal from '@/app/hooks/modals/useSearchModal';
import { AiOutlineSearch } from 'react-icons/ai';

export const SearchIcon = () => {
  const searchModal = useSearchModal();
  return (
    <div
      className='cursor-pointer flex gap-4'
      onClick={() => {
        searchModal.onOpen();
      }}
    >
      <AiOutlineSearch size={25} />
    </div>
  );
};
