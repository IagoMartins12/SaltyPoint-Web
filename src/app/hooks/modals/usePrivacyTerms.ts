import { create } from 'zustand';

export interface PrivacyTermStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const usePrivacyTerms = create<PrivacyTermStore>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default usePrivacyTerms;
