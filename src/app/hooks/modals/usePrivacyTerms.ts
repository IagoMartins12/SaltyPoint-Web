import { ModalStore } from '@/app/types/Types';
import { create } from 'zustand';

const usePrivacyTerms = create<ModalStore>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default usePrivacyTerms;
