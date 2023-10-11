import useAuth, {
  checkAndSetToken,
  removeToken,
} from '@/app/hooks/auth/useAuth';
import { ModalStore } from '@/app/types/ComponentTypes';
import { useEffect, useState } from 'react';
import { AiOutlineHome, AiOutlineLogout, AiOutlineUser } from 'react-icons/ai';
import { BiMessageAlt } from 'react-icons/bi';
import { BsBag } from 'react-icons/bs';
import { HiOutlineDeviceMobile } from 'react-icons/hi';
import { RiCoupon2Line } from 'react-icons/ri';
import {
  MdOutlineAccountCircle,
  MdOutlineFavoriteBorder,
  MdOutlinePrivacyTip,
} from 'react-icons/md';
import {
  useAddress,
  useAppDownload,
  useCoupons,
  useFavoriteModal,
  useLoginModal,
  useMenuHeaderState,
  useMyOrderModal,
  usePrivacyTerms,
  useTalkToUsModal,
  useUserInfoModal,
} from '@/app/hooks/modals/useModal';

export const useMenuHeader = () => {
  const loginModal = useLoginModal();
  const talkToUsModal = useTalkToUsModal();
  const termPrivacyModal = usePrivacyTerms();
  const appModal = useAppDownload();
  const couponModal = useCoupons();
  const addressModal = useAddress();
  const userInfoModal = useUserInfoModal();
  const favoritesModal = useFavoriteModal();
  const authOptions = useAuth();
  const myOrderModal = useMyOrderModal();
  const leftMenu = useMenuHeaderState();
  const iconsSize = 28;

  const toggleMenu = () => {
    leftMenu.isOpen ? leftMenu.onClose() : leftMenu.onOpen();
  };

  const menuAction = (store: ModalStore) => {
    store.onOpen();
    leftMenu.onClose();
  };

  const logoout = () => {
    leftMenu.onClose();

    setTimeout(() => {
      removeToken();
    }, 1000);
  };

  const commomOptions = [
    {
      label: 'Fale conosco',
      icon: <BiMessageAlt size={iconsSize} />,
      onclick: () => {
        menuAction(talkToUsModal);
      },
    },
    {
      label: 'Termos de uso e privacidade',
      icon: <MdOutlinePrivacyTip size={iconsSize} />,
      onclick: () => {
        menuAction(termPrivacyModal);
      },
    },
    {
      label: 'Baixe nosso app',
      icon: <HiOutlineDeviceMobile size={iconsSize} />,
      onclick: () => {
        menuAction(appModal);
      },
    },
  ];

  const menuOptions = [
    {
      label: 'Entrar ou cadastrar',
      icon: <AiOutlineUser size={iconsSize} />,
      onclick: () => {
        menuAction(loginModal);
      },
    },
    ...commomOptions,
  ];

  const userMenuOptions = [
    {
      label: 'Minha conta',
      icon: <MdOutlineAccountCircle size={iconsSize} />,
      onclick: () => {
        menuAction(userInfoModal);
      },
    },
    {
      label: 'Meus favoritos',
      icon: <MdOutlineFavoriteBorder size={iconsSize} />,
      onclick: () => {
        menuAction(favoritesModal);
      },
    },
    {
      label: 'Meus endereços',
      icon: <AiOutlineHome size={iconsSize} />,
      onclick: () => {
        menuAction(addressModal);
      },
    },
    {
      label: 'Meus pedidos',
      icon: <BsBag size={iconsSize} />,
      onclick: () => {
        menuAction(myOrderModal);
      },
    },
    {
      label: 'Meus cupons',
      icon: <RiCoupon2Line size={iconsSize} />,
      onclick: () => {
        menuAction(couponModal);
      },
    },
    ...commomOptions,
    {
      label: 'Sair',
      icon: <AiOutlineLogout size={iconsSize} />,
      onclick: () => {
        logoout();
      },
    },
  ];

  useEffect(() => {
    checkAndSetToken();
  }, []);

  return {
    userMenuOptions,
    menuOptions,
    toggleMenu,
    leftMenu,
    authOptions,
  };
};
