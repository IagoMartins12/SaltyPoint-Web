import { Store } from '@/app/types/ComponentTypes';
import { create } from 'zustand';

const useGlobalStore = create<Store>(set => ({
  categorys: [],
  setCategorys: categorys => set({ categorys: categorys }),
  products: [],
  setProducts: products => set({ products: products }),
}));

export default useGlobalStore;
