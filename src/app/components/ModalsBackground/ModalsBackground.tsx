'use client';

import useDelete from '@/app/hooks/modals/useDelete';
import {
  useAddAddress,
  useAddress,
  useAppDownload,
  useCoupons,
  useForgetPasswordModal,
  useLoginModal,
  usePrivacyTerms,
  useRegisterModal,
  useSearchModal,
  useTalkToUsModal,
} from '@/app/hooks/modals/useModal';
import { useEffect } from 'react';

export const ModalsBackground = () => {
  const modals = [
    useLoginModal(),
    useRegisterModal(),
    useTalkToUsModal(),
    useAppDownload(),
    usePrivacyTerms(),
    useForgetPasswordModal(),
    useSearchModal(),
    useCoupons(),
    useAddress(),
    useAddAddress(),
    useDelete(),
  ];

  useEffect(() => {
    const isOpen = modals.some(modal => modal.isOpen);

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [modals]);

  return (
    <div
      // className='modalBackground z-10'
      style={{
        display: modals.some(modal => modal.isOpen) ? 'flex' : 'none',
      }}
      onClick={() => {
        console.log('clicou');
        modals.forEach(modal => {
          if (modal.isOpen) {
            modal.onClose();
          }
        });
      }}
    />
  );
};
