import { AuthStore } from '@/app/types/ComponentTypes';
import { create } from 'zustand';

const useAuth = create<AuthStore>(set => ({
  isLogged: false,
  setIsLogged: () => set({ isLogged: true }),
  setLogout: () => set({ isLogged: false }),
  token: null,
  setToken: (token: string | null) => set({ token: token }),
}));

export const checkAndSetToken = () => {
  const storedToken = localStorage.getItem('secret');

  if (storedToken) {
    useAuth.getState().setToken(storedToken);
    useAuth.getState().setIsLogged();
  }
};

export const removeToken = () => {
  localStorage.removeItem('secret');
  useAuth.getState().setToken(null);
  useAuth.getState().setLogout();
};

export default useAuth;
