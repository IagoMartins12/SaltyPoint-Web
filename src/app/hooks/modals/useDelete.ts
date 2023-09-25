import { deleteProps } from '@/app/types/ComponentTypes';
import { create } from 'zustand';

const useDelete = create<deleteProps>(set => ({
  currentItem: null,
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setCurrentItem: item => set({ currentItem: item }),
}));

export default useDelete;
