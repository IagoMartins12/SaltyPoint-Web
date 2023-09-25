'use client';

import { AddressModal } from '../components/Modals/AddressModal';
import { AppDownloadModal } from '../components/Modals/AppDownloadModal';
import { CouponsModal } from '../components/Modals/CouponsModal';
import { ForgetPasswordModal } from '../components/Modals/ForgetPasswordModal/ForgetPasswordModal';
import { LoginModal } from '../components/Modals/LoginModal/LoginModal';
import { RegisterModal } from '../components/Modals/RegisterModal/RegisterModal';
import { SearchModal } from '../components/Modals/SearchModal';
import { TalkToUsModal } from '../components/Modals/TalkToUsModal';
import { TermPrivacyModal } from '../components/Modals/TermPrivacyModal';

const ModalsProvider = () => {
  return (
    <>
      <LoginModal />
      <RegisterModal />
      <TalkToUsModal />
      <TermPrivacyModal />
      <AppDownloadModal />
      <ForgetPasswordModal />
      <SearchModal />
      <CouponsModal />
      <AddressModal />
    </>
  );
};

export default ModalsProvider;
