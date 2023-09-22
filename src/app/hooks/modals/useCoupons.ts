import { ModalStore } from '@/app/types/ComponentTypes';
import { create } from 'zustand';

const useCoupons = create<ModalStore>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useCoupons;
