import { WarningStore } from '@/app/types/ComponentTypes';
import { create } from 'zustand';

const createWarningModalStore = () =>
  create<WarningStore>(set => ({
    currentItem: null,
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    setCurrentItem: item => set({ currentItem: item }),
  }));

export const useWarningRewardModal = createWarningModalStore();
