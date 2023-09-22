'use client';

import { AppDownloadModal } from '../components/Modals/AppDownloadModal';
import { ForgetPasswordModal } from '../components/Modals/ForgetPasswordModal/ForgetPasswordModal';
import { LoginModal } from '../components/Modals/LoginModal/LoginModal';
import { RegisterModal } from '../components/Modals/RegisterModal/RegisterModal';
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
    </>
  );
};

export default ModalsProvider;
