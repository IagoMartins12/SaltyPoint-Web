'use client';

import { useDeleteAddress } from '@/app/hooks/modals/useDelete';
import {
  useAddAddress,
  useAddress,
  useAppDownload,
  useCoupons,
  useFavoriteModal,
  useForgetPasswordModal,
  useLoginModal,
  useMyOrderModal,
  useOrderModal,
  usePrivacyTerms,
  useRegisterModal,
  useSearchModal,
  useTalkToUsModal,
  useUserInfoModal,
} from '@/app/hooks/modals/useModal';
import { useProductModal } from '@/app/hooks/modals/useProduct';
import { useEffect } from 'react';

const modals = [
  useLoginModal,
  useRegisterModal,
  useTalkToUsModal,
  useAppDownload,
  usePrivacyTerms,
  useForgetPasswordModal,
  useSearchModal,
  useOrderModal,
  useCoupons,
  useAddress,
  useAddAddress,
  useDeleteAddress,
  useUserInfoModal,
  useFavoriteModal,
  useProductModal,
  useMyOrderModal,
];

export const ModalsBackground = () => {
  const openModals = modals.map(modal => modal().isOpen);

  useEffect(() => {
    const isOpen = openModals.some(isOpen => isOpen);

    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [openModals]);

  return <></>;
};
