'use client';

import useAppDownload from '@/app/hooks/modals/useAppDownload';
import useForgetPasswordModal from '@/app/hooks/modals/useForgetPassword';
import useLoginModal from '@/app/hooks/modals/useLoginModal';
import usePrivacyTerms from '@/app/hooks/modals/usePrivacyTerms';
import useRegisterModal from '@/app/hooks/modals/useRegisterModal';
import useTalkToUsModal from '@/app/hooks/modals/useTalkToUs';
import { useEffect } from 'react';

export const ModalsBackground = () => {
  const modals = [
    useLoginModal(),
    useRegisterModal(),
    useTalkToUsModal(),
    useAppDownload(),
    usePrivacyTerms(),
    useForgetPasswordModal(),
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
      className='modalBackground'
      style={{
        display: modals.some(modal => modal.isOpen) ? 'flex' : 'none',
      }}
      onClick={() => {
        modals.forEach(modal => {
          if (modal.isOpen) {
            modal.onClose();
          }
        });
      }}
    />
  );
};
