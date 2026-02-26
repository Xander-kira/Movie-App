import React from 'react';
import useViewingHistory from '../hooks/useViewingHistory';
import useWatchlist from '../hooks/useWatchlist';
import MovieCard from './MovieCard';

export default function RecentlyViewed({ onMovieClick }) {
  const { viewingHistory, clearHistory } = useViewingHistory();
  const { addToWatchlist, isInWatchlist } = useWatchlist();

  if (viewingHistory.length === 0) return null;

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
          📺 Recently Viewed
        </h2>
        <button
          onClick={clearHistory}
          className="text-xs md:text-sm px-3 py-1 rounded-lg bg-slate-700/50 hover:bg-slate-600/70 text-slate-300 transition-all duration-300"
        >
          Clear
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
        {viewingHistory.slice(0, 10).map((movie) => (
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
