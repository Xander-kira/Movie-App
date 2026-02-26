import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useWatchlist } from '../hooks/useWatchlistContext';

export default function MovieDetailsModal({ movieId, isOpen, onClose }) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const API_KEY = import.meta.env.VITE_API_KEY;
  const inWatchlist = isInWatchlist(movieId);

  useEffect(() => {
    if (!isOpen || !movieId) return;

    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits,videos`
        );
        setMovie(res.data);
        setError('');
      } catch (err) {
        console.error(err);
        setError('Failed to load movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [isOpen, movieId, API_KEY]);

  const handleWatchlistToggle = () => {
    if (inWatchlist) {
      removeFromWatchlist(movieId);
    } else {
      addToWatchlist(movie);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 text-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {loading ? (
          <div className="p-8 text-center">
            <p>Loading details...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-400">
            <p>{error}</p>
          </div>
        ) : movie ? (
          <>
            {/* Backdrop Image */}
            {movie.backdrop_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                alt={movie.title}
                className="w-full h-64 object-cover"
              />
            )}

            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{movie.title}</h2>
                  <p className="text-gray-300">{movie.tagline}</p>
                </div>
                <button
                  onClick={onClose}
                  className="text-2xl font-bold text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Rating & Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-gray-400">Rating</p>
                  <p className="text-2xl font-bold">⭐ {movie.vote_average?.toFixed(1)}</p>
                </div>
                <div>
                  <p className="text-gray-400">Release Date</p>
                  <p className="text-lg font-semibold">{movie.release_date}</p>
                </div>
                <div>
                  <p className="text-gray-400">Runtime</p>
                  <p className="text-lg font-semibold">{movie.runtime} minutes</p>
                </div>
                <div>
                  <p className="text-gray-400">Budget</p>
                  <p className="text-lg font-semibold">
                    ${movie.budget ? (movie.budget / 1000000).toFixed(1) : 'N/A'}M
                  </p>
                </div>
              </div>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="mb-6">
                  <p className="text-gray-400 mb-2">Genres</p>
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="bg-amber-600 px-3 py-1 rounded-full text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Overview */}
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">Overview</h3>
                <p className="text-gray-300">{movie.overview}</p>
              </div>

              {/* Cast */}
              {movie.credits?.cast && movie.credits.cast.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3">Cast</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {movie.credits.cast.slice(0, 6).map((actor) => (
                      <div key={actor.id} className="text-center">
                        {actor.profile_path && (
                          <img
                            src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                            alt={actor.name}
                            className="w-full rounded mb-2"
                          />
                        )}
                        <p className="font-semibold text-sm">{actor.name}</p>
                        <p className="text-gray-400 text-xs">{actor.character}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Trailer */}
              {movie.videos?.results && movie.videos.results.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3">Trailer</h3>
                  <div className="aspect-video bg-black rounded">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
                      title="Trailer"
                      allowFullScreen
                      className="rounded"
                    ></iframe>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleWatchlistToggle}
                  className={`flex-1 py-2 px-4 rounded font-bold transition ${
                    inWatchlist
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-amber-600 hover:bg-amber-700'
                  }`}
                >
                  {inWatchlist ? '❤️ Remove from Watchlist' : '🤍 Add to Watchlist'}
                </button>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
