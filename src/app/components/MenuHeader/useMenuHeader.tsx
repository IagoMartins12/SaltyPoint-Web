import useAuth, {
  checkAndSetToken,
  removeToken,
} from '@/app/hooks/auth/useAuth';
import useAppDownload from '@/app/hooks/modals/useAppDownload';
import useLoginModal from '@/app/hooks/modals/useLoginModal';
import usePrivacyTerms from '@/app/hooks/modals/usePrivacyTerms';
import useTalkToUsModal from '@/app/hooks/modals/useTalkToUs';
import { ModalStore } from '@/app/types/ComponentTypes';
import { useTheme } from 'next-themes';
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
import useCoupons from '@/app/hooks/modals/useCoupons';
import useAddress from '@/app/hooks/modals/useAddress';

export const useMenuHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { theme } = useTheme();
  const loginModal = useLoginModal();
  const talkToUsModal = useTalkToUsModal();
  const termPrivacyModal = usePrivacyTerms();
  const appModal = useAppDownload();
  const couponModal = useCoupons();
  const addressModal = useAddress();

  const authOptions = useAuth();

  const iconsSize = 28;

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
        menuAction(loginModal);
      },
    },
    {
      label: 'Meus favoritos',
      icon: <MdOutlineFavoriteBorder size={iconsSize} />,
      onclick: () => {
        menuAction(loginModal);
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
        menuAction(loginModal);
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
    menuOpen,
    theme,
    authOptions,
  };
};
