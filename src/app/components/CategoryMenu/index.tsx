'use client';
import { getCategories } from '@/app/services';
import { Category } from '@/app/types/ModelsType';
import { useEffect, useState } from 'react';
import CategoryBox from '../CategoryBox';

export const CategoryMenu = () => {
  const [category, setCategory] = useState<Category[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCategories();
        setCategory(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData(); // Chame a função assíncrona aqui
  }, []);

  const handleSetSelected = (category_name: string) => {
    if (category_name === selected) {
      return setSelected(null);
    }
    setSelected(category_name);
  };

  return (
    <div className='w-10/12 mx-auto pt-4 flex flex-row items-center  overflow-x-auto'>
      {category
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
