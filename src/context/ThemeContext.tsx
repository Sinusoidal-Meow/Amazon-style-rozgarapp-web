import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  isManual: boolean;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  resetToSystem: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'vanrozgar_theme';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Determine initial theme from localStorage or system preference
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light';
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [isManual, setIsManual] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return saved === 'light' || saved === 'dark';
  });

  // Apply DOM classes and properties whenever theme changes
  const applyThemeToDOM = useCallback((currentTheme: Theme) => {
    const root = document.documentElement;
    if (currentTheme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      root.style.colorScheme = 'dark';
      document.body.style.backgroundColor = '#1C2619';
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      root.style.colorScheme = 'light';
      document.body.style.backgroundColor = '#F7F2E8';
    }
  }, []);

  // Sync with DOM on initial mount & theme changes
  useEffect(() => {
    applyThemeToDOM(theme);
  }, [theme, applyThemeToDOM]);

  // Listen to OS color scheme changes when not overridden manually
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemChange = (e: MediaQueryListEvent) => {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (!saved) {
        const newSystemTheme: Theme = e.matches ? 'dark' : 'light';
        setThemeState(newSystemTheme);
        applyThemeToDOM(newSystemTheme);
      }
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, [applyThemeToDOM]);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const nextTheme: Theme = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      setIsManual(true);
      applyThemeToDOM(nextTheme);
      return nextTheme;
    });
  }, [applyThemeToDOM]);

  const setTheme = useCallback((newTheme: Theme) => {
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    setIsManual(true);
    setThemeState(newTheme);
    applyThemeToDOM(newTheme);
  }, [applyThemeToDOM]);

  const resetToSystem = useCallback(() => {
    localStorage.removeItem(THEME_STORAGE_KEY);
    setIsManual(false);
    const systemTheme: Theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setThemeState(systemTheme);
    applyThemeToDOM(systemTheme);
  }, [applyThemeToDOM]);

  return (
    <ThemeContext.Provider value={{ theme, isManual, toggleTheme, setTheme, resetToSystem }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
