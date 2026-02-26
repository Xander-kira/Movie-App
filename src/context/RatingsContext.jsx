import React, { useState, useEffect } from 'react';
import RatingsContext from './ratingsValue';

export default function RatingsProvider({ children }) {
  const [ratings, setRatings] = useState({});

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('movieRatings');
      if (saved) {
        setRatings(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading ratings:', error);
    }
  }, []);

  // Save to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('movieRatings', JSON.stringify(ratings));
    } catch (error) {
      console.error('Error saving ratings:', error);
    }
  }, [ratings]);

  const rateMovie = (movieId, rating, review = '') => {
    setRatings((prev) => ({
      ...prev,
      [movieId]: {
        rating: Math.max(1, Math.min(10, rating)), // Clamp between 1-10
        review,
        ratedAt: new Date().toISOString(),
      },
    }));
  };

  const removeRating = (movieId) => {
    setRatings((prev) => {
      const newRatings = { ...prev };
      delete newRatings[movieId];
      return newRatings;
    });
  };

  const getMovieRating = (movieId) => {
    return ratings[movieId] || null;
  };

  const getAverageRating = (movieIds) => {
    const rated = movieIds.filter((id) => ratings[id]);
    if (rated.length === 0) return 0;
    const sum = rated.reduce((acc, id) => acc + ratings[id].rating, 0);
    return (sum / rated.length).toFixed(1);
  };

  return (
    <RatingsContext.Provider value={{ ratings, rateMovie, removeRating, getMovieRating, getAverageRating }}>
      {children}
    </RatingsContext.Provider>
  );
}
