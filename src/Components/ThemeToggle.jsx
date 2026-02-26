import React from 'react';
import { useTheme } from '../hooks/useTheme';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded-lg font-bold transition-all bg-gray-700 text-gray-300 hover:bg-gray-600 flex items-center gap-2"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDark ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
}
