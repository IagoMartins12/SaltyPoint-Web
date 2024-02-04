'use client';

import dynamic from 'next/dynamic';
import { NotOpenModal } from '../components/Modals/NotOpenModal';

// Dynamically import all modal components
const modalComponents = {
  LoginModal: dynamic(() =>
    import('../components/Modals/LoginModal/LoginModal').then(
      mod => mod.LoginModal,
    ),
  ),
  RegisterModal: dynamic(() =>
    import('../components/Modals/RegisterModal/RegisterModal').then(
      mod => mod.RegisterModal,
    ),
  ),
  TalkToUsModal: dynamic(() =>
    import('../components/Modals/TalkToUsModal').then(mod => mod.TalkToUsModal),
  ),
  TermPrivacyModal: dynamic(() =>
    import('../components/Modals/TermPrivacyModal').then(
      mod => mod.TermPrivacyModal,
    ),
  ),
  AppDownloadModal: dynamic(() =>
    import('../components/Modals/AppDownloadModal').then(
      mod => mod.AppDownloadModal,
    ),
  ),
  ForgetPasswordModal: dynamic(() =>
    import('../components/Modals/ForgetPasswordModal/ForgetPasswordModal').then(
      mod => mod.ForgetPasswordModal,
    ),
  ),
  SearchModal: dynamic(() =>
    import('../components/Modals/SearchModal').then(mod => mod.SearchModal),
  ),
  CouponsModal: dynamic(() =>
    import('../components/Modals/CouponsModal').then(mod => mod.CouponsModal),
  ),
  AddressModal: dynamic(() =>
    import('../components/Modals/AddressModal').then(mod => mod.AddressModal),
  ),
  AddAddressModal: dynamic(() =>
    import('../components/Modals/AddAddressModal').then(
      mod => mod.AddAddressModal,
    ),
  ),
  OrderModal: dynamic(() =>
    import('../components/Modals/OrderModal').then(mod => mod.default),
  ),
  DeleteItemModal: dynamic(() =>
    import('../components/Modals/DeleteItemModal').then(
      mod => mod.DeleteItemModal,
    ),
  ),
  UserInfoModal: dynamic(() =>
    import('../components/Modals/UserInfoModal').then(mod => mod.UserInfoModal),
  ),
  ChangePasswordModal: dynamic(() =>
    import('../components/Modals/ChangePasswordModal').then(
      mod => mod.ChangePasswordModal,
    ),
  ),
  DeleteUserModal: dynamic(() =>
    import('../components/Modals/DeleteUserModal').then(
      mod => mod.DeleteUserModal,
    ),
  ),
  FavoriteModal: dynamic(() =>
    import('../components/Modals/FavoriteModal').then(mod => mod.FavoriteModal),
  ),
  ProductModal: dynamic(() =>
    import('../components/Modals/ProductModal').then(mod => mod.ProductModal),
  ),
  DeleteItemCartModal: dynamic(() =>
    import('../components/Modals/DeleteItemCartModal').then(
      mod => mod.DeleteItemCartModal,
    ),
  ),
  MyOrdersModal: dynamic(() =>
    import('../components/Modals/MyOrdersModal').then(mod => mod.MyOrdersModal),
  ),
  CurrentOrderModal: dynamic(() =>
    import('../components/Modals/CurrentOrderModal').then(
      mod => mod.CurrentOrderModal,
    ),
  ),
  RewardModal: dynamic(() =>
    import('../components/Modals/RewardModal').then(mod => mod.RewardModal),
  ),
  WarningRewardModal: dynamic(() =>
    import('../components/Modals/WarningRewardModal').then(
      mod => mod.WarningRewardModal,
    ),
  ),
  PixModal: dynamic(() =>
    import('../components/Modals/PixModal').then(mod => mod.PixModal),
  ),
  FidelityModal: dynamic(() =>
    import('../components/Modals/FidelityModal').then(mod => mod.FidelityModal),
  ),

  ChangeDeliveryInfoModal: dynamic(() =>
    import('../components/Modals/ChangeDeliveryInfoModal').then(
      mod => mod.ChangeDeliveryInfoModal,
    ),
  ),
};

const ModalsProvider = () => {
  return (
    <>
      <NotOpenModal />
      {Object.values(modalComponents).map((Modal, index) => (
        <Modal key={index} />
      ))}
    </>
  );
};

export default ModalsProvider;
