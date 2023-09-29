import { create, StoreApi, UseBoundStore } from 'zustand';

// Defina o tipo ModalStore
export interface ModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

// Crie uma função para encapsular a criação do hook
function createModalHook(id: string) {
  return create<ModalStore>(set => ({
    id: id,
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  }));
}

// Remove .getState() when exporting hooks
export const addressModalHook = createModalHook('addressModal');
export const couponsModalHook = createModalHook('couponModal');
export const openCouponsModalHook = couponsModalHook.setState({ isOpen: true });
