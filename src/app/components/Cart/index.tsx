'use client';

import usePrivateStore from '@/app/hooks/store/usePrivateStore';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { CartProductCard } from '../CartProductCard/index2';
import { handleSetSelected } from '@/app/utils';
import { useCartMenuState, useOrderModal } from '@/app/hooks/modals/useModal';

export const Cart = () => {
  const rightCart = useCartMenuState();

  const { cart_product } = usePrivateStore();
  const orderModal = useOrderModal();
  const toggleMenu = () => {
    rightCart.isOpen ? rightCart.onClose() : rightCart.onOpen();
  };

  const cartProductTotal = cart_product.reduce(
    (total, item) => total + Number(item.value),
    0,
  );

  const handleOpenOrderModal = () => {
    rightCart.onClose();
    orderModal.onOpen();
  };

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
      <div className={`relative z-50 w-6/12 cursor-auto`}>
        <div
          className={` ${
            rightCart.isOpen ? 'fixed' : ''
          } inset-0 bg-gray-800 opacity-25`}
          onClick={toggleMenu}
        ></div>
        <nav
          className={`fixed top-0 z-50 ${
            rightCart.isOpen ? 'cart-open' : 'cart-closed'
          } bottom-0 flex flex-col w-[80%] sm:w-[65%] md:w-[50%] lg:w-[30%] pb-12 px-2 sm:px-6 modalsBackground overflow-y-auto privacyScroll`}
        >
          <div className='flex flex-col gap-6  h-full px-2 py-3'>
            <div className='flex flex-col gap-6 px-2 py-3'>
              {cart_product.map((cartProduct, i) => (
                <CartProductCard cart_product={cartProduct} key={i} />
              ))}
            </div>

            <div className='flex justify-between'>
              <span className='text-lg sm:text-xl font-light underline'>
                {' '}
                Subtotal:{' '}
              </span>
              <span className='text-base font-medium'>
                R${cartProductTotal.toFixed(2)}
              </span>
            </div>

            <div className='flex flex-col gap-6'>
              <button
                className={`w-full p-2 sm:p-3 rounded-3xl ${
                  cart_product.length === 0 ? 'bg-slate-300' : 'bg-red-400'
                }`}
                disabled={cart_product.length === 0 ? true : false}
                onClick={handleOpenOrderModal}
              >
                <span className='text-base sm:text-lg font-medium'>
                  Iniciar Compra
                </span>
              </button>

              <span
                className='text-center font-light text-base underline cursor-pointer'
                onClick={() => {
                  rightCart.onClose();
                  handleSetSelected('Pizzas Salgadas');
                }}
              >
                Ver mais produtos{' '}
              </span>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};
