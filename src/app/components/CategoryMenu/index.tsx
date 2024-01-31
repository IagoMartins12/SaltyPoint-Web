'use client';

import { useState } from 'react';
import { CategoryBox } from '../CategoryBox';
import useGlobalStore from '@/app/hooks/store/useGlobalStore';
import { handleSetSelected } from '@/app/utils';

export const categoriesToExclude = ['Bordas', 'Brindes', 'Promoções'];

export const CategoryMenu = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { categorys } = useGlobalStore();

  const handleCategorySelection = (categoryName: string) => {
    if (categoryName === selectedCategory) {
      return setSelectedCategory(null);
    }

    setSelectedCategory(categoryName);
    handleSetSelected(categoryName);
  };

  const visibleCategories = categorys.filter(
    category => !categoriesToExclude.includes(category.category_name),
  );

  return (
    <div className='w-11/12 mx-auto my-3 py-2 flex flex-row items-center hiddenScroll overflow-x-auto gap-3'>
      {visibleCategories.map(category => (
        <CategoryBox
          key={category.category_name}
          label={category.category_name}
          onClick={handleCategorySelection}
          selected={selectedCategory}
        />
      ))}
    </div>
  );
};
