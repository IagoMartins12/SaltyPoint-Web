import { create } from 'zustand';

export interface ForgetPasswordStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useForgetPasswordModal = create<ForgetPasswordStore>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useForgetPasswordModal;
