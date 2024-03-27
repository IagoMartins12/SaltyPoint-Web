import dynamic from 'next/dynamic';
import NotOpenModal from '../components/Modals/NotOpenModal';
const AddAddressModal = dynamic(
  () => import('../components/Modals/AddAddressModal'),
);
const AddressModal = dynamic(() => import('../components/Modals/AddressModal'));
const AppDownloadModal = dynamic(
  () => import('../components/Modals/AppDownloadModal'),
);
const ChangeDeliveryInfoModal = dynamic(
  () => import('../components/Modals/ChangeDeliveryInfoModal'),
);
const ChangePasswordModal = dynamic(
  () => import('../components/Modals/ChangePasswordModal'),
);
const CouponsModal = dynamic(() => import('../components/Modals/CouponsModal'));
const CurrentOrderModal = dynamic(
  () => import('../components/Modals/CurrentOrderModal'),
);
const DeleteItemCartModal = dynamic(
  () => import('../components/Modals/DeleteItemCartModal'),
);
const DeleteItemModal = dynamic(
  () => import('../components/Modals/DeleteItemModal'),
);
const DeleteUserModal = dynamic(
  () => import('../components/Modals/DeleteUserModal'),
);
const FavoriteModal = dynamic(
  () => import('../components/Modals/FavoriteModal'),
);
const FidelityModal = dynamic(
  () => import('../components/Modals/FidelityModal'),
);
const ForgetPasswordModal = dynamic(
  () => import('../components/Modals/ForgetPasswordModal/ForgetPasswordModal'),
);
const LoginModal = dynamic(
  () => import('../components/Modals/LoginModal/LoginModal'),
);
const MyOrdersModal = dynamic(
  () => import('../components/Modals/MyOrdersModal'),
);
const OrderModal = dynamic(() => import('../components/Modals/OrderModal'));
const PixModal = dynamic(() => import('../components/Modals/PixModal'));
const ProductModal = dynamic(() => import('../components/Modals/ProductModal'));
const RegisterModal = dynamic(
  () => import('../components/Modals/RegisterModal/RegisterModal'),
);
const RewardCartModal = dynamic(
  () => import('../components/Modals/RewardCartModal'),
);
const RewardModal = dynamic(() => import('../components/Modals/RewardModal'));
const SearchModal = dynamic(() => import('../components/Modals/SearchModal'));
const TalkToUsModal = dynamic(
  () => import('../components/Modals/TalkToUsModal'),
);
const TermPrivacyModal = dynamic(
  () => import('../components/Modals/TermPrivacyModal'),
);
const UserInfoModal = dynamic(
  () => import('../components/Modals/UserInfoModal'),
);
const WarningRewardModal = dynamic(
  () => import('../components/Modals/WarningRewardModal'),
);

const modalComponents = [
  LoginModal,
  RegisterModal,
  TalkToUsModal,
  TermPrivacyModal,
  OrderModal,
  AppDownloadModal,
  ForgetPasswordModal,
  SearchModal,
  CouponsModal,
  DeleteItemModal,
  UserInfoModal,
  ChangePasswordModal,
  DeleteUserModal,
  FavoriteModal,
  ProductModal,
  DeleteItemCartModal,
  MyOrdersModal,
  CurrentOrderModal,
  RewardModal,
  WarningRewardModal,
  NotOpenModal,
  PixModal,
  FidelityModal,
  ChangeDeliveryInfoModal,
  AddressModal,
  AddAddressModal,
  RewardCartModal,
];

const ModalsProvider = () => {
  return (
    <>
      {modalComponents.map((ModalComponent, index) => (
        <ModalComponent key={index} />
      ))}
    </>
  );
};

export default ModalsProvider;
