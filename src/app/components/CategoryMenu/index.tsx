'use client';

import { useState } from 'react';
import { NewCategoryBox } from '../CategoryBox';
import useGlobalStore from '@/app/hooks/store/useGlobalStore';
import { handleSetSelected } from '@/app/utils';

export const CategoryMenu = () => {
  const [selected, setSelected] = useState<string | null>(null);

  const { categorys } = useGlobalStore();

  const handleSelect = (category_name: string) => {
    if (category_name === selected) {
      return setSelected(null);
    }

    setSelected(category_name);
    handleSetSelected(category_name);
  };

  return (
    <div
      className='w-11/12 mx-auto my-4 py-2 flex flex-row items-center  hiddenScroll overflow-x-auto gap-3'
      id='categoryMenu'
    >
      {categorys
        .filter(c => c.category_name !== 'Bordas')
        .map(item => (
          <NewCategoryBox
            key={item.category_name}
            label={item.category_name}
            onClick={handleSelect}
            selected={selected}
          />
        ))}
    </div>
  );
};
