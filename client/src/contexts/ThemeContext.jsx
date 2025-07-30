import React, { createContext, useState, useEffect } from 'react';

const themes = {
  light: {
    background: '#f8fafc',
    primary: '#6366f1',
    text: '#1e293b',
    card: '#ffffff',
  },
  dark: {
    background: '#0f172a',
    primary: '#818cf8',
    text: '#f1f5f9',
    card: '#1e293b',
  }
};

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme: themes[theme], toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}