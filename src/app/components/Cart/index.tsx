'use client';

import { useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';

export const Cart = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(prevState => !prevState);
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
      <div className={`relative z-50 w-6/12`}>
        <div
          className={`cursor-auto ${
            menuOpen ? 'fixed' : ''
          } inset-0 bg-gray-800 opacity-25`}
          onClick={toggleMenu}
        ></div>
        <nav
          className={`fixed top-0 ${
            menuOpen ? 'cart-open' : 'cart-closed'
          } bottom-0 flex flex-col w-[70%] lg:w-[25%] py-6 px-6 modalsBackground overflow-y-auto`}
        ></nav>
      </div>
    </>
  );
};
