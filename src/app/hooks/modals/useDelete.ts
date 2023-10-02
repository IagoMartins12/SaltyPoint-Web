import { DeleteStore } from '@/app/types/ComponentTypes';
import { create } from 'zustand';

const createDeleteModalStore = () =>
  create<DeleteStore>(set => ({
    currentItem: null,
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    setCurrentItem: item => set({ currentItem: item }),
  }));

export const useDeleteAddress = createDeleteModalStore();
