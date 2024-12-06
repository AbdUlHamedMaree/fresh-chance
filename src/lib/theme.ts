'use client';

import Cookies from 'js-cookie';
import { useLayoutEffect, useState } from 'react';

export type ThemeUnion = 'light' | 'dark';

const getSystemTheme = () => (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

export const useTheme = () => {
  const [theme, setTheme] = useState(Cookies.get('theme') as ThemeUnion | undefined);

  const changeTheme = (theme: ThemeUnion) => {
    Cookies.set('theme', theme);
    setTheme(theme);

    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  };

  const toggleTheme = () => changeTheme(theme === 'light' ? 'dark' : 'light');

  return {
    theme,
    changeTheme,
    toggleTheme,
  };
};

export const ThemeWorker = () => {
  const { theme, changeTheme } = useTheme();
  useLayoutEffect(() => {
    if (!theme) {
      changeTheme(getSystemTheme());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
