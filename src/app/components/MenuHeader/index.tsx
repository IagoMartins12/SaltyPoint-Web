'use client';

import React, { useEffect, useState } from 'react';
import {
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineMenu,
  AiOutlineUser,
} from 'react-icons/ai';
import { BiMessageAlt } from 'react-icons/bi';
import { HiOutlineDeviceMobile } from 'react-icons/hi';
import { MdOutlineAccountCircle, MdOutlinePrivacyTip } from 'react-icons/md';
import { GrFavorite } from 'react-icons/gr';

// Importando useAuth e checkAndSetToken corretamente
import useAuth, {
  checkAndSetToken,
  removeToken,
} from '@/app/hooks/auth/useAuth';
import useLoginModal from '@/app/hooks/modals/useLoginModal';
import useTalkToUsModal from '@/app/hooks/modals/useTalkToUs';
import { ModalStore } from '@/app/types/Types';
import { BsBag } from 'react-icons/bs';

export const MenuHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const loginModal = useLoginModal();
  const talkToUsModal = useTalkToUsModal();
  const authOptions = useAuth();

  const toggleMenu = () => {
    setMenuOpen(prevState => !prevState);
  };

  const menuAction = (store: ModalStore) => {
    store.onOpen();
    setMenuOpen(false);
  };

  const logoout = () => {
    setMenuOpen(false);

    setTimeout(() => {
      removeToken();
    }, 1000);
  };

  const menuOptions = [
    {
      label: 'Entrar ou cadastrar',
      icon: <AiOutlineUser size={25} />,
      onclick: () => {
        menuAction(loginModal);
      },
    },
    {
      label: 'Fale conosco',
      icon: <BiMessageAlt size={25} />,
      onclick: () => {
        menuAction(talkToUsModal);
      },
    },
    {
      label: 'Termos de uso e privacidade',
      icon: <MdOutlinePrivacyTip size={25} />,
      onclick: () => {
        menuAction(loginModal);
      },
    },
    {
      label: 'Baixe nosso app',
      icon: <HiOutlineDeviceMobile size={25} />,
      onclick: () => {
        menuAction(loginModal);
      },
    },
  ];

  const userMenuOptions = [
    {
      label: 'Minha conta',
      icon: <MdOutlineAccountCircle size={25} />,
      onclick: () => {
        menuAction(loginModal);
      },
    },
    {
      label: 'Meus favoritos',
      icon: <GrFavorite size={25} />,
      onclick: () => {
        menuAction(loginModal);
      },
    },
    {
      label: 'Meus endereços',
      icon: <AiOutlineHome size={25} />,
      onclick: () => {
        menuAction(loginModal);
      },
    },
    {
      label: 'Meus pedidos',
      icon: <BsBag size={25} />,
      onclick: () => {
        menuAction(loginModal);
      },
    },
    {
      label: 'Fale conosco',
      icon: <BiMessageAlt size={25} />,
      onclick: () => {
        menuAction(talkToUsModal);
      },
    },
    {
      label: 'Termos de uso e privacidade',
      icon: <MdOutlinePrivacyTip size={25} />,
      onclick: () => {
        menuAction(loginModal);
      },
    },
    {
      label: 'Baixe nosso app',
      icon: <HiOutlineDeviceMobile size={25} />,
      onclick: () => {
        menuAction(loginModal);
      },
    },
    {
      label: 'Sair',
      icon: <AiOutlineLogout size={25} />,
      onclick: () => {
        logoout();
      },
    },
  ];

  useEffect(() => {
    // Chamando a função checkAndSetToken corretamente
    checkAndSetToken();
  }, []);

  return (
    <>
      <div className=''>
        <button
          className='navbar-burger flex items-center p-3'
          onClick={toggleMenu}
        >
          <AiOutlineMenu />
        </button>
      </div>
      <div className={`relative z-50 w-6/12`}>
        <div
          className={`navbar-backdrop ${
            menuOpen ? 'fixed' : ''
          } inset-0 bg-gray-800 opacity-25`}
          onClick={toggleMenu}
        ></div>
        <nav
          className={`fixed top-0 ${
            menuOpen ? 'menu-open' : 'menu-closed'
          } bottom-0 flex flex-col w-[70%] lg:w-[25%] py-6 px-6 bg-white border-r overflow-y-auto`}
        >
          <div className='flex flex-col gap-4'>
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
                    <span className='text-base'>{option.label}</span>
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
                    <span className='text-base'>{option.label}</span>
                  </div>
                ))}
          </div>
          <div className='mt-auto'>
            <p className='my-4 text-xs text-center text-gray-400'>
              <span>Copyright © 2021</span>
            </p>
          </div>
        </nav>
      </div>
    </>
  );
};
