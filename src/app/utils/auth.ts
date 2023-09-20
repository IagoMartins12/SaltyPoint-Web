import useAuth from '../hooks/auth/useAuth';
import { LoginUserDto } from '../types/Dtos';
import { User } from '../types/ModelsType';

export const setUserLocalStorage = (acessToken: string) => {
  const auth = useAuth();
  auth.setToken(acessToken);
  localStorage.setItem('secret', JSON.stringify(acessToken));
};

export const getUserLocalStorage = () => {
  const json = localStorage.getItem('a');

  if (!json) {
    return null;
  }

  const user = JSON.parse(json);
  return user ?? null;
};

export const removeFromStorage = () => localStorage.removeItem('a');
