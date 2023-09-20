import { ModalStore } from '@/app/types/Types';
import { create } from 'zustand';

const useTalkToUsModal = create<ModalStore>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useTalkToUsModal;
