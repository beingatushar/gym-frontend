import React, { useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useThemeStore } from '../../stores/useThemeStore.ts';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    // Manage dark class on the html element for Tailwind's dark mode
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // More robustly manage theme classes on the body
    const themeClasses = [
      'theme-light',
      'theme-dark',
      'theme-rose',
      'theme-sky',
      'theme-amber',
    ];
    document.body.classList.remove(...themeClasses);
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-brand-dark-secondary hover:bg-theme-secondary dark:hover:bg-brand-dark transition-colors duration-300 border border-theme-primary"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <FaMoon size={20} className="text-theme-primary" />
      ) : (
        <FaSun size={20} className="text-theme-primary" />
      )}
    </button>
  );
};

export default ThemeToggle;
