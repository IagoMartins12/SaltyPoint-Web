import { ModalStore } from '@/app/types/ComponentTypes';
import { create } from 'zustand';

// Defina o tipo ModalStore
// export const useAddAddress = create<ModalStore>(set => ({
//   isOpen: false,
//   onOpen: () => set({ isOpen: true }),
//   onClose: () => set({ isOpen: false }),
// }));

// export const useAddress = create<ModalStore>(set => ({
//   isOpen: false,
//   onOpen: () => set({ isOpen: true }),
//   onClose: () => set({ isOpen: false }),
// }));

// export const useAppDownload = create<ModalStore>(set => ({
//   isOpen: false,
//   onOpen: () => set({ isOpen: true }),
//   onClose: () => set({ isOpen: false }),
// }));

// export const useCoupons = create<ModalStore>(set => ({
//   isOpen: false,
//   onOpen: () => set({ isOpen: true }),
//   onClose: () => set({ isOpen: false }),
// }));

// export const useForgetPasswordModal = create<ModalStore>(set => ({
//   isOpen: false,
//   onOpen: () => set({ isOpen: true }),
//   onClose: () => set({ isOpen: false }),
// }));

// export const useLoginModal = create<ModalStore>(set => ({
//   isOpen: false,
//   onOpen: () => set({ isOpen: true }),
//   onClose: () => set({ isOpen: false }),
// }));

// export const usePrivacyTerms = create<ModalStore>(set => ({
//   isOpen: false,
//   onOpen: () => set({ isOpen: true }),
//   onClose: () => set({ isOpen: false }),
// }));

// export const useRegisterModal = create<ModalStore>(set => ({
//   isOpen: false,
//   onOpen: () => set({ isOpen: true }),
//   onClose: () => set({ isOpen: false }),
// }));

// export const useSearchModal = create<ModalStore>(set => ({
//   isOpen: false,
//   onOpen: () => set({ isOpen: true }),
//   onClose: () => set({ isOpen: false }),
// }));

// export const useTalkToUsModal = create<ModalStore>(set => ({
//   isOpen: false,
//   onOpen: () => set({ isOpen: true }),
//   onClose: () => set({ isOpen: false }),
// }));

// export const useUserInfoModal = create<ModalStore>(set => ({
//   isOpen: false,
//   onOpen: () => set({ isOpen: true }),
//   onClose: () => set({ isOpen: false }),
// }));

// import { create } from 'zustand';

// Define a common function to create modal stores
const createModalStore = () =>
  create<ModalStore>(set => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  }));

// Use the createModalStore function to create different modal stores
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
