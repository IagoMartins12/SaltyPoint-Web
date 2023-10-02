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
