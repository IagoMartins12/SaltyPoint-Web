import { PrivateStore } from '@/app/types/ComponentTypes';
import { create } from 'zustand';

const usePrivateStore = create<PrivateStore>(set => ({
  address: [],
  setAddress: address => set({ address: address }),
}));

export default usePrivateStore;
