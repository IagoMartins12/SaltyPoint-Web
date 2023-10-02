'use client';

import { AddAddressModal } from '../components/Modals/AddAddressModal';
import { AddressModal } from '../components/Modals/AddressModal';
import { AppDownloadModal } from '../components/Modals/AppDownloadModal';
import { ChangePasswordModal } from '../components/Modals/ChangePasswordModal';
import { CouponsModal } from '../components/Modals/CouponsModal';
import { DeleteItemModal } from '../components/Modals/DeleteItemModal';
import { ForgetPasswordModal } from '../components/Modals/ForgetPasswordModal/ForgetPasswordModal';
import { LoginModal } from '../components/Modals/LoginModal/LoginModal';
import { RegisterModal } from '../components/Modals/RegisterModal/RegisterModal';
import { SearchModal } from '../components/Modals/SearchModal';
import { TalkToUsModal } from '../components/Modals/TalkToUsModal';
import { TermPrivacyModal } from '../components/Modals/TermPrivacyModal';
import { UserInfoModal } from '../components/Modals/UserInfoModal';

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
      <AddAddressModal />
      <DeleteItemModal />
      <UserInfoModal />
      <ChangePasswordModal />
    </>
  );
};

export default ModalsProvider;
