'use client';

import { ProductCard } from '../ProductCard';
import useGlobalStore from '@/app/hooks/store/useGlobalStore';

export const ProductMenu = () => {
  const { categorys, products } = useGlobalStore();

  return (
    <div className='w-10/12 mx-auto pt-4 flex flex-col gap-8'>
      {categorys
        .filter(c => c.category_name !== 'Bordas')
        .map(item => (
          <div className='flex flex-col w-full gap-6' key={item.id}>
            <span className='font-medium text-3xl'>{item.category_name}</span>
            <div className='flex gap-4 flex-wrap justify-center'>
              {products
                .filter(p => p.category_id === item.id)
                .map(product => (
                  <ProductCard product={product} key={product.id} />
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};
