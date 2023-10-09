'use client';

import usePrivateStore from '@/app/hooks/store/usePrivateStore';
import { useEffect, useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { CartProductCard } from '../CartProductCard';

export const Cart = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { cart_product } = usePrivateStore();

  const toggleMenu = () => {
    setMenuOpen(prevState => !prevState);
  };

  const cartProductTotal = cart_product.reduce(
    (total, item) => total + Number(item.value),
    0,
  );

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
  }, [menuOpen]);
  return (
    <>
      <div className=''>
        <button
          className='navbar-burger flex items-center p-3'
          onClick={toggleMenu}
        >
          <AiOutlineShoppingCart size={25} />
        </button>
      </div>
      <div className={`relative z-50 w-6/12`}>
        <div
          className={`cursor-auto ${
            menuOpen ? 'fixed' : ''
          } inset-0 bg-gray-800 opacity-25`}
          onClick={toggleMenu}
        ></div>
        <nav
          className={`fixed top-0 z-50 ${
            menuOpen ? 'cart-open' : 'cart-closed'
          } bottom-0 flex flex-col w-[70%] lg:w-[25%] pb-12 px-6 modalsBackground overflow-y-auto privacyScroll`}
        >
          <div className='flex flex-col gap-6  h-full px-2 py-3'>
            <div className='flex flex-col gap-6 px-2 py-3'>
              {cart_product.map(cartProduct => (
                <CartProductCard cart_product={cartProduct} />
              ))}
            </div>

            <div className='flex justify-between'>
              <span className='text-2xl font-light underline'> Subtotal: </span>
              <span className='text-lg font-medium'>
                R${cartProductTotal.toFixed(2)}
              </span>
            </div>

            <div className='flex flex-col gap-6'>
              <button className='w-full px-3 py-3 rounded-3xl bg-red-400'>
                <span className='text-lg font-medium'> Iniciar Compra</span>
              </button>

              <span className='text-center font-light text-lg underline'>
                {' '}
                Ver mais produtos{' '}
              </span>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};
