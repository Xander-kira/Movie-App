import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import useWatchlist from '../hooks/useWatchlist';

export default function TrendingMovies({ onMovieClick }) {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addToWatchlist, isInWatchlist } = useWatchlist();
  const API_KEY = import.meta.env.VITE_API_KEY;

  const fetchTrendingMovies = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
      );
      setTrendingMovies(response.data.results.slice(0, 10));
    } catch (error) {
      console.error('Error fetching trending movies:', error);
    } finally {
      setLoading(false);
    }
  }, [API_KEY]);

  useEffect(() => {
    fetchTrendingMovies();
  }, [fetchTrendingMovies]);

  if (loading) {
    return (
      <div className="mb-10 h-40 flex items-center justify-center">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-violet-500 rounded-full animate-spin"></div>
          <div className="absolute inset-2 bg-slate-950 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-10">
      <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-6">
        🔥 Trending This Week
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
        {trendingMovies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => onMovieClick(movie)}
            className="aspect-video rounded-2xl overflow-hidden cursor-pointer"
          >
            <MovieCard
              title={movie.title}
              date={movie.release_date}
              poster={movie.poster_path}
              popularity={movie.popularity}
              onFavoriteClick={() => addToWatchlist(movie)}
              isFavorited={isInWatchlist(movie.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
