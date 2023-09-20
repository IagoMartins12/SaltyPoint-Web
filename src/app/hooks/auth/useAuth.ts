import { create } from 'zustand';

export interface AuthStore {
  isLogged: boolean;
  setIsLogged: () => void;
  setLoggout: () => void;
  token: string | null;
  setToken: (token: string | null) => void;
}

const useAuth = create<AuthStore>(set => ({
  isLogged: false,
  setIsLogged: () => set({ isLogged: true }),
  setLoggout: () => set({ isLogged: false }),
  token: null,
  setToken: (token: string | null) => set({ token: token }),
}));

export default useAuth;
