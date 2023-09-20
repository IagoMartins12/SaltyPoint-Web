import { create } from 'zustand';

export interface TalkToUsStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useTalkToUsModal = create<TalkToUsStore>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useTalkToUsModal;
