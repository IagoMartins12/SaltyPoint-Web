'use client';

import { AddAddressModal } from '../components/Modals/AddAddressModal';
import { AddressModal } from '../components/Modals/AddressModal';
import { AppDownloadModal } from '../components/Modals/AppDownloadModal';
import { ChangeDeliveryInfoModal } from '../components/Modals/ChangeDeliveryInfoModal';
import { ChangePasswordModal } from '../components/Modals/ChangePasswordModal';
import { CouponsModal } from '../components/Modals/CouponsModal';
import { CurrentOrderModal } from '../components/Modals/CurrentOrderModal';
import { DeleteItemCartModal } from '../components/Modals/DeleteItemCartModal';
import { DeleteItemModal } from '../components/Modals/DeleteItemModal';
import { DeleteUserModal } from '../components/Modals/DeleteUserModal';
import { FavoriteModal } from '../components/Modals/FavoriteModal';
import { FidelityModal } from '../components/Modals/FidelityModal';
import { ForgetPasswordModal } from '../components/Modals/ForgetPasswordModal/ForgetPasswordModal';
import { LoginModal } from '../components/Modals/LoginModal/LoginModal';
import { MyOrdersModal } from '../components/Modals/MyOrdersModal';
import { NotOpenModal } from '../components/Modals/NotOpenModal';
import OrderModal from '../components/Modals/OrderModal';
import { PixModal } from '../components/Modals/PixModal';
import { ProductModal } from '../components/Modals/ProductModal';
import { RegisterModal } from '../components/Modals/RegisterModal/RegisterModal';
import { RewardCartModal } from '../components/Modals/RewardCartModal';
import { RewardModal } from '../components/Modals/RewardModal';
import { SearchModal } from '../components/Modals/SearchModal';
import { TalkToUsModal } from '../components/Modals/TalkToUsModal';
import { TermPrivacyModal } from '../components/Modals/TermPrivacyModal';
import { UserInfoModal } from '../components/Modals/UserInfoModal';
import { WarningRewardModal } from '../components/Modals/WarningRewardModal';

const ModalsProvider = () => {
  return (
    <>
      <LoginModal />
      <RegisterModal />
      <TalkToUsModal />
      <TermPrivacyModal />
      <OrderModal />
      <AppDownloadModal />
      <ForgetPasswordModal />
      <SearchModal />
      <CouponsModal />

      <DeleteItemModal />
      <UserInfoModal />
      <ChangePasswordModal />
      <DeleteUserModal />
      <FavoriteModal />
      <ProductModal />
      <DeleteItemCartModal />
      <MyOrdersModal />
      <CurrentOrderModal />
      <RewardModal />
      <WarningRewardModal />
      <NotOpenModal />
      <PixModal />
      <FidelityModal />
      <ChangeDeliveryInfoModal />
      <AddressModal />
      <AddAddressModal />
      <RewardCartModal />
    </>
  );
};

export default ModalsProvider;
