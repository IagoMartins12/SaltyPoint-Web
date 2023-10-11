'use client';

import { AiOutlineMenu } from 'react-icons/ai';
import ThemeSwitch from '../ThemeSwitcher/ThemeSwitch';
import { useMenuHeader } from './useMenuHeader';

export const MenuHeader = () => {
  const { menuOptions, toggleMenu, userMenuOptions, leftMenu, authOptions } =
    useMenuHeader();

  return (
    <>
      <div className=''>
        <button
          className='navbar-burger flex items-center p-3'
          onClick={toggleMenu}
        >
          <AiOutlineMenu size={25} />
        </button>
      </div>
      <div className={`relative  w-6/12`}>
        <div
          className={`${
            leftMenu.isOpen ? 'fixed' : ''
          } z-40 inset-0 bg-black opacity-50`}
          onClick={toggleMenu}
        />
        <nav
          className={`fixed top-0 z-50 ${
            leftMenu.isOpen ? 'menu-open' : 'menu-closed'
          } bottom-0 flex flex-col w-[80%] sm:w-[65%] md:w-[50%] lg:w-[25%] py-6 px-6 modalsBackground overflow-y-auto`}
        >
          <div className='flex flex-col gap-6 px-4 py-3'>
            {authOptions.isLogged
              ? userMenuOptions.map((option, index) => (
                  <div
                    className='mb-1 flex items-center justify-start gap-3 cursor-pointer'
                    key={index}
                    onClick={() => {
                      option.onclick();
                    }}
                  >
                    {option.icon && option.icon}
                    <span className='text-base font-medium sm:text-lg'>
                      {option.label}
                    </span>
                  </div>
                ))
              : menuOptions.map((option, index) => (
                  <div
                    className='mb-1 flex items-center justify-start gap-3 cursor-pointer'
                    key={index}
                    onClick={() => {
                      option.onclick();
                    }}
                  >
                    {option.icon && option.icon}
                    <span className='text-base font-medium sm:text-lg'>
                      {option.label}
                    </span>
                  </div>
                ))}
          </div>
          <div className='mt-auto'>
            <ThemeSwitch />
            <p className='my-4 text-xs text-center text-gray-400'>
              <span>Salty point © 2023</span>
            </p>
          </div>
        </nav>
      </div>
    </>
  );
};
