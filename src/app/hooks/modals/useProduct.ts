import { ProductStore } from '@/app/types/ComponentTypes';
import { create } from 'zustand';

const createProductModal = () =>
  create<ProductStore>(set => ({
    currentProduct: null,
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    setCurrentProduct: item => set({ currentProduct: item }),
  }));

export const useProductModal = createProductModal();
export const useCurrentOrderModal = createProductModal();
