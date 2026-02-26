import React, { useState, useEffect } from 'react';
import ViewingHistoryContext from './viewingHistoryValue';

export default function ViewingHistoryProvider({ children }) {
  const [viewingHistory, setViewingHistory] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('viewingHistory');
      if (saved) {
        setViewingHistory(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading viewing history:', error);
    }
  }, []);

  // Save to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('viewingHistory', JSON.stringify(viewingHistory));
    } catch (error) {
      console.error('Error saving viewing history:', error);
    }
  }, [viewingHistory]);

  const addToHistory = (movie) => {
    setViewingHistory((prev) => {
      // Remove if already exists
      const filtered = prev.filter((m) => m.id !== movie.id);
      // Add to beginning with timestamp
      return [
        { ...movie, viewedAt: new Date().toISOString() },
        ...filtered,
      ].slice(0, 50); // Keep only last 50
    });
  };

  const clearHistory = () => {
    setViewingHistory([]);
  };

  return (
    <ViewingHistoryContext.Provider value={{ viewingHistory, addToHistory, clearHistory }}>
      {children}
    </ViewingHistoryContext.Provider>
  );
}
