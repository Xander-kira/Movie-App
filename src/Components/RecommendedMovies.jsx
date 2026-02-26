import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import useWatchlist from '../hooks/useWatchlist';

export default function RecommendedMovies({ onMovieClick }) {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const { watchlist, addToWatchlist, isInWatchlist } = useWatchlist();
  const API_KEY = import.meta.env.VITE_API_KEY;

  const fetchRecommendations = useCallback(async () => {
    if (watchlist.length === 0) return;
    
    setLoading(true);
    try {
      // Get similar movies for the first 3 items in watchlist
      const recommendationPromises = watchlist.slice(0, 3).map((movie) =>
        axios.get(
          `https://api.themoviedb.org/3/movie/${movie.id}/similar?api_key=${API_KEY}`
        )
      );

      const results = await Promise.all(recommendationPromises);
      
      // Combine and deduplicate recommendations
      const allRecommendations = results.flatMap((res) => res.data.results);
      const uniqueRecommendations = Array.from(
        new Map(allRecommendations.map((item) => [item.id, item])).values()
      );
      
      // Remove any movies already in watchlist
      const filtered = uniqueRecommendations.filter(
        (rec) => !watchlist.some((w) => w.id === rec.id)
      );
      
      // Sort by popularity and limit to 10
      const sorted = filtered.sort((a, b) => b.popularity - a.popularity).slice(0, 10);
      setRecommendations(sorted);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoading(false);
    }
  }, [watchlist, API_KEY]);

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  if (watchlist.length === 0) return null;

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

  if (recommendations.length === 0) return null;

  return (
    <div className="mb-10">
      <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent mb-6">
        ✨ Recommended For You
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
        {recommendations.map((movie) => (
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
