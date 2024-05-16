'use client';

import { useEffect, useState } from 'react';
import { CategoryBox } from '../CategoryBox';
import useGlobalStore from '@/app/hooks/store/useGlobalStore';
import { handleSetSelected } from '@/app/utils';
import { Category } from '@/app/types/ModelsType';

export const categoriesToExclude = ['Bordas', 'Brindes', 'Promoções'];

export const CategoryMenu = () => {
  const [visibleCategories, setVisibleCategories] = useState<Category[] | []>(
    [],
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { categorys } = useGlobalStore();

  const handleCategorySelection = (categoryName: string) => {
    if (categoryName === selectedCategory) {
      return setSelectedCategory(null);
    }

    setSelectedCategory(categoryName);
    handleSetSelected(categoryName);
  };

  useEffect(() => {
    const visibleCategories = categorys?.filter(
      category => !categoriesToExclude.includes(category.category_name),
    );
    setVisibleCategories(visibleCategories);
  }, [categorys]);

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
