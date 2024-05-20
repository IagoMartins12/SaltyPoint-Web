'use client';

import usePrivateStore from '@/app/hooks/store/usePrivateStore';
import { Cart } from '../Cart';

export const CartIcon = () => {
  const { cart_product } = usePrivateStore();
  return (
    <div className='cursor-pointer flex gap-4 relative'>
      <div className='z-10'>
        <Cart />
      </div>
      <span className='h-3 w-3 bottom-0 right-4 top-0 text-center text-xs absolute rounded-full'>
        {cart_product.length}
      </span>
    </div>
  );
};
