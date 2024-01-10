'use client';

import usePrivateStore from '@/app/hooks/store/usePrivateStore';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { CartProductCard } from '../CartProductCard';
import { handleSetSelected } from '@/app/utils';
import { useCartMenuState, useOrderModal } from '@/app/hooks/modals/useModal';
import { useEffect } from 'react';
import useGlobalStore from '@/app/hooks/store/useGlobalStore';

export const Cart = () => {
  const rightCart = useCartMenuState();
  const { products, categorys } = useGlobalStore();
  const { cart_product, setCart_product } = usePrivateStore();
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

  // const cartGuardianPizza = () => {
  //   const dollyPromo = products.find(
  //     p => p.name.toLowerCase() === 'dolly promoção',
  //   );
  //   const pizzas = products.filter(p => {
  //     const category = categorys.find(c => c.id === p.category_id);
  //     return category?.category_name.toLowerCase().includes('pizzas');
  //   });

  //   if (dollyPromo && pizzas.length >= 3) {
  //     const pizzaIds = pizzas.map(pizza => pizza.id);
  //     const pizzaCountInCart = cart_product.filter(cartProduct =>
  //       pizzaIds.includes(cartProduct.product_id),
  //     ).length;

  //     if (pizzaCountInCart >= 3) {
  //       const hasDollyPromo = cart_product.some(
  //         cartProduct => cartProduct.product_id === dollyPromo.id,
  //       );

  //       if (!hasDollyPromo) {
  //         const newCart = {
  //           product_id: dollyPromo.id,
  //           quantity: 1,
  //           observation: 'Recompensa',
  //           value: '0',
  //           size: 0,
  //         };

  //         const updatedCartProduct = [...cart_product, newCart];
  //         setCart_product(updatedCartProduct);
  //       }
  //     } else {
  //       const updatedCartProduct = cart_product.filter(
  //         cartProduct => cartProduct.product_id !== dollyPromo.id,
  //       );
  //       setCart_product(updatedCartProduct);
  //     }
  //   }
  // };

  //Promoção 1
  const cartGuardian = () => {
    const promo1 = products.find(p => p.name.toLowerCase() === 'combo 1');
    const dollyPromo = products.find(
      p => p.name.toLowerCase() === 'dolly promoção',
    );

    if (promo1 && dollyPromo) {
      const hasPromo1 = cart_product.some(
        cartProduct => cartProduct.product_id === promo1.id,
      );
      const hasDollyPromo = cart_product.some(
        cartProduct => cartProduct.product_id === dollyPromo.id,
      );

      if (hasPromo1 && !hasDollyPromo) {
        const newCart = {
          product_id: dollyPromo.id,
          quantity: 1,
          observation: null,
          value: '0',
          size: 0,
        };

        const updatedCartProduct = [...cart_product, newCart];
        //@ts-ignore
        setCart_product(updatedCartProduct);
      } else if (!hasPromo1 && hasDollyPromo) {
        const updatedCartProduct = cart_product.filter(
          cartProduct => cartProduct.product_id !== dollyPromo.id,
        );
        setCart_product(updatedCartProduct);
      }
    }
  };

  useEffect(() => {
    cartGuardian();
    // cartGuardianPizza();
  }, [cart_product]);
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
