import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'rose' | 'sky' | 'amber';

type ThemeState = {
  theme: Theme;
  toggleTheme: () => void;
};

const themes: Theme[] = ['light', 'dark', 'rose', 'sky', 'amber'];

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () =>
        set((state) => ({
          theme: themes[(themes.indexOf(state.theme) + 1) % themes.length],
        })),
    }),
    {
      name: 'theme-storage', // name of the item in storage
    }
  )
);
