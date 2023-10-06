'use client';

import { ProductCard } from '../ProductCard';
import useGlobalStore from '@/app/hooks/store/useGlobalStore';

export const ProductMenu = () => {
  const { categorys, products } = useGlobalStore();

  return (
    <div className='w-11/12 mx-auto pt-4 flex z-10 flex-col gap-8'>
      {categorys
        .filter(c => c.category_name !== 'Bordas')
        .map(category => (
          <div
            className='flex flex-col w-full gap-6'
            key={category.id}
            id={category.category_name}
          >
            <span className='font-medium text-3xl px-3'>
              {category.category_name}
            </span>
            <div className='flex gap-x-2 gap-y-6 flex-wrap '>
              {products
                .filter(p => p.category_id === category.id)
                .map(product => (
                  <ProductCard product={product} key={product.id} />
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};
