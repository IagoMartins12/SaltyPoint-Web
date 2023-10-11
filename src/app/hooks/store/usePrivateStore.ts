import { PrivateStore } from '@/app/types/ComponentTypes';
import { create } from 'zustand';

const usePrivateStore = create<PrivateStore>(set => ({
  address: [],
  setAddress: address => set({ address: address }),
  user: null,
  setUser: user => set({ user: user }),
  favorites: [],
  setFavorites: favorite => set({ favorites: favorite }),
  cart: null,
  setCart: cart => set({ cart: cart }),
  cart_product: [],
  setCart_product: cart_product => set({ cart_product: cart_product }),
  coupons: [],
  setCoupons: discount_cupom => set({ coupons: discount_cupom }),
  orders: [],
  setOrders: orders => set({ orders: orders }),
}));

export default usePrivateStore;
