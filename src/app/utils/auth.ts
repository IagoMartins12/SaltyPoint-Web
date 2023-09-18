import { User } from '../types/ModelsType';

export const setUserLocalStorage = (user: User) => {
  if (user && user.token !== undefined) {
    localStorage.setItem('a', JSON.stringify(user.token));
  }
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
