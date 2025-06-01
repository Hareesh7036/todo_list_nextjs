'use client'
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import FontAwesomeIconWrapper from './font-awsom-wrapper';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>( 'light');

  useEffect(() => {
    if (typeof window !== 'undefined') {
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <FontAwesomeIconWrapper className="p-2 border rounded bg-gray-200 dark:bg-gray-800 cursor-pointer" icon={faSun} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
  );
}
