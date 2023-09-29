import { PrivateStore } from '@/app/types/ComponentTypes';
import { create } from 'zustand';

const usePrivateStore = create<PrivateStore>(set => ({
  address: [],
  setAddress: address => set({ address: address }),
  user: null,
  setUser: user => set({ user: user }),
}));

export default usePrivateStore;
