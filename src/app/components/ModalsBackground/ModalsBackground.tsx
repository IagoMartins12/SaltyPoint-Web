'use client';

import { useDeleteAddress } from '@/app/hooks/modals/useDelete';
import {
  useAddAddress,
  useAddress,
  useAppDownload,
  useCoupons,
  useFavoriteModal,
  useFidelityModal,
  useForgetPasswordModal,
  useLoginModal,
  useMyOrderModal,
  useOrderModal,
  usePixModal,
  usePrivacyTerms,
  useRegisterModal,
  useRewardModal,
  useSearchModal,
  useTalkToUsModal,
  useUserInfoModal,
  useCartMenuState,
  useChangeDeliveryInfoModal,
  useChangePasswordModal,
  useDeleteUser,
  useGeneralDataModal,
  useMenuHeaderState,
} from '@/app/hooks/modals/useModal';
import { useProductModal } from '@/app/hooks/modals/useProduct';
import { useWarningRewardModal } from '@/app/hooks/modals/useWarning';
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
  usePixModal,
  useFidelityModal,
  useWarningRewardModal,
  useRewardModal,
  useCartMenuState,
  useChangeDeliveryInfoModal,
  useChangePasswordModal,
  useDeleteUser,
  useGeneralDataModal,
  useMenuHeaderState,
];

export const ModalsBackground = () => {
  const openModals = modals.map(modal => modal().isOpen);

  useEffect(() => {
    const isOpen = openModals.some(isOpen => isOpen);

    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [openModals]);

  return <></>;
};
