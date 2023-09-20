export const getUserLocalStorage = () => {
  const json = localStorage.getItem('a');

  if (!json) {
    return null;
  }

  const user = JSON.parse(json);
  return user ?? null;
};

export const removeFromStorage = () => localStorage.removeItem('a');
