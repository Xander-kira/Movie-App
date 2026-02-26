import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem('theme');
      const theme = saved ? JSON.parse(saved) : true;
      
      // Apply theme immediately
      const htmlElement = document.documentElement;
      if (theme) {
        htmlElement.classList.add('dark');
        htmlElement.setAttribute('data-theme', 'dark');
      } else {
        htmlElement.classList.remove('dark');
        htmlElement.setAttribute('data-theme', 'light');
      }
      
      return theme;
    } catch (error) {
      console.error('Error parsing theme:', error);
      // Default to dark
      const htmlElement = document.documentElement;
      htmlElement.classList.add('dark');
      htmlElement.setAttribute('data-theme', 'dark');
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('theme', JSON.stringify(isDark));
      const htmlElement = document.documentElement;
      
      if (isDark) {
        htmlElement.classList.add('dark');
        htmlElement.setAttribute('data-theme', 'dark');
      } else {
        htmlElement.classList.remove('dark');
        htmlElement.setAttribute('data-theme', 'light');
      }
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
