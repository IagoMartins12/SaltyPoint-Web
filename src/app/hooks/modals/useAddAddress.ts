import { ModalStore } from '@/app/types/ComponentTypes';
import { create } from 'zustand';

const useAddAddress = create<ModalStore>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useAddAddress;
