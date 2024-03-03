import { Discount_cupom, Reward, User_Rewards } from '@/app/types/ModelsType';
import { create } from 'zustand';

interface CouponStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  currentItem: User_Rewards | Discount_cupom | null;
  setCurrentItem: (item: User_Rewards | null | Discount_cupom) => void;
}

const createCouponStore = () =>
  create<CouponStore>(set => ({
    currentItem: null,
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    setCurrentItem: item => set({ currentItem: item }),
  }));

export const useRewardCartModal = createCouponStore();
