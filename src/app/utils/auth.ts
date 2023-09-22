export const getUserLocalStorage = () => {
  const json = localStorage.getItem('secret');

  if (!json) {
    return null;
  }

  const user = JSON.parse(json);
  return user ?? null;
};

export const removeFromStorage = () => localStorage.removeItem('secret');
