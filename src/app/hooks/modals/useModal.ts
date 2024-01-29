import { ModalStore } from '@/app/types/ComponentTypes';
import { create } from 'zustand';

const createModalStore = () =>
  create<ModalStore>(set => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  }));

export const useAddAddress = createModalStore();
export const useAddress = createModalStore();
export const useAppDownload = createModalStore();
export const useCoupons = createModalStore();
export const useForgetPasswordModal = createModalStore();
export const useLoginModal = createModalStore();
export const usePrivacyTerms = createModalStore();
export const useRegisterModal = createModalStore();
export const useSearchModal = createModalStore();
export const useTalkToUsModal = createModalStore();
export const useUserInfoModal = createModalStore();
export const useChangePasswordModal = createModalStore();
export const useDeleteUser = createModalStore();
export const useFavoriteModal = createModalStore();
export const useOrderModal = createModalStore();
export const useMyOrderModal = createModalStore();
export const useMenuHeaderState = createModalStore();
export const useCartMenuState = createModalStore();
export const useRewardModal = createModalStore();
export const useGeneralDataModal = createModalStore();
export const usePixModal = createModalStore();
export const useFidelityModal = createModalStore();
