'use client';

import { useState } from 'react';
import CategoryBox from '../CategoryBox';
import useGlobalStore from '@/app/hooks/store/useGlobalStore';

export const CategoryMenu = () => {
  const [selected, setSelected] = useState<string | null>(null);

  const { categorys } = useGlobalStore();

  const handleSetSelected = (category_name: string) => {
    if (category_name === selected) {
      return setSelected(null);
    }

    setSelected(category_name);

    const targetDiv = document.getElementById(`${category_name}`);
    if (targetDiv) {
      targetDiv.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='w-10/12 mx-auto my-4 pt-4 flex flex-row items-center  overflow-x-auto'>
      {categorys
        .filter(c => c.category_name !== 'Bordas')
        .map(item => (
          <CategoryBox
            key={item.category_name}
            label={item.category_name}
            onClick={handleSetSelected}
            selected={selected}
          />
        ))}
    </div>
  );
};
