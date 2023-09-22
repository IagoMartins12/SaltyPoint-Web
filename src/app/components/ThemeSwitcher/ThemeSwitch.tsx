import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleThemeToggle = () => {
    setTheme(theme === 'light' || theme === undefined ? 'dark' : 'light');
  };

  useEffect(() => {
    setMounted(true);

    if (theme) setTheme(theme);
    else setTheme('light');
  }, []);

  if (!mounted) {
    return null;
  }

  console.log(theme);
  return (
    <div className='cursor-pointer flex items-center justify-center'>
      {theme === 'light' ? (
        <MdDarkMode size={28} onClick={handleThemeToggle} />
      ) : (
        <MdLightMode size={28} onClick={handleThemeToggle} />
      )}
    </div>
  );
};

export default ThemeSwitch;
