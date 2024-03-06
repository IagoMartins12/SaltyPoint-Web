export const getUserLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const json = localStorage.getItem('secret');

    if (!json) {
      return null;
    }

    const user = JSON.parse(json);
    return user ?? null;
  }

  return null;
};

export const removeFromStorage = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('secret');
  }
};
