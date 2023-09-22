import { Store } from '@/app/types/ComponentTypes';
import { Category, Product } from '@/app/types/ModelsType';
import { create } from 'zustand';

const useGlobalStore = create<Store>(set => ({
  categorys: [],
  setCategorys: (categorys: Category[]) => set({ categorys: categorys }),
  products: [],
  setProducts: (products: Product[]) => set({ products: products }),
}));

export default useGlobalStore;
