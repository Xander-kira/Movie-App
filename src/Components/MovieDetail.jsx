import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import TrailerModal from "./TrailerModal";
import RatingComponent from "./RatingComponent";
import CollectionsManager from "./CollectionsManager";
import WhereToWatch from "./WhereToWatch";
import useViewingHistory from "../hooks/useViewingHistory";

export default function MovieDetail({ movieId, onClose, onAddToWatchlist, isInWatchlist }) {
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showTrailerModal, setShowTrailerModal] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const { addToHistory } = useViewingHistory();

  const API_KEY = import.meta.env.VITE_API_KEY;

  const fetchMovieDetails = useCallback(async () => {
    setLoading(true);
    try {
      const [movieRes, creditsRes, similarRes, videosRes] = await Promise.all([
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`),
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`),
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}`),
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`),
      ]);

      setMovie(movieRes.data);
      setCast(creditsRes.data.cast.slice(0, 6)); // Get first 6 cast members
      setSimilar(similarRes.data.results.slice(0, 6)); // Get first 6 similar movies
      
      // Track viewing history
      addToHistory(movieRes.data);
      
      // Extract trailer key - try multiple fallbacks
      const videos = videosRes.data.results || [];
      let trailer = null;
      
      // Priority 1: Official Trailer
      trailer = videos.find(
        (video) => video.type === "Trailer" && video.site === "YouTube" && video.name.toLowerCase().includes("official")
      );
      
      // Priority 2: Any Trailer on YouTube
      if (!trailer) {
        trailer = videos.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
      }
      
      // Priority 3: Any YouTube video
      if (!trailer) {
        trailer = videos.find((video) => video.site === "YouTube");
      }
      
      // Priority 4: First video
      if (!trailer) {
        trailer = videos[0];
      }
      
      console.log("Available videos:", videos); // Debug log
      console.log("Selected trailer:", trailer); // Debug log
      
      if (trailer && trailer.key) {
        setTrailerKey(trailer.key);
      }
      
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load movie details");
    } finally {
      setLoading(false);
    }
  }, [movieId, API_KEY, addToHistory]);

  useEffect(() => {
    fetchMovieDetails();
  }, [fetchMovieDetails]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <p className="text-white text-2xl">Loading...</p>
      </div>
    );
  }

  if (!movie || error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-gray-900 p-8 rounded-xl text-white max-w-md">
          <p className="text-red-400 mb-4">{error || "Failed to load movie"}</p>
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const posterURL = movie.poster_path
    ? `https://image.tmdb.org/t/p/w400${movie.poster_path}`
    : "/fallback.jpg";
  const backdropURL = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-slate-900 rounded-xl max-w-5xl w-full my-8 text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 rounded-full p-2 text-xl z-10"
        >
          ✕
        </button>

        {/* Backdrop Image */}
        {backdropURL && (
          <div className="relative h-64 md:h-80 overflow-hidden rounded-t-xl">
            <img
              src={backdropURL}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900"></div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {/* Poster */}
            <div className="md:col-span-1">
              <img
                src={posterURL}
                alt={movie.title}
                className="w-full rounded-lg shadow-lg"
              />
            </div>

            {/* Movie Info */}
            <div className="md:col-span-3">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{movie.title}</h1>
              {movie.release_date && (
                <p className="text-slate-400 mb-4">
                  📅 {new Date(movie.release_date).getFullYear()}
                </p>
              )}

              {/* Rating and Vote */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2 bg-emerald-600 px-3 py-1 rounded-lg">
                  <span className="text-xl">⭐</span>
                  <span className="font-bold">
                    {movie.vote_average.toFixed(1)}/10
                  </span>
                </div>
                <p className="text-slate-400">
                  ({movie.vote_count.toLocaleString()} votes)
                </p>
              </div>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="mb-6">
                  <p className="text-slate-400 mb-2">Genres:</p>
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="bg-emerald-600/30 border border-emerald-500 px-3 py-1 rounded-full text-sm text-emerald-300"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Runtime and Budget */}
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm md:text-base">
                {movie.runtime && (
                  <div>
                    <p className="text-slate-400">Runtime:</p>
                    <p className="font-bold">{movie.runtime} minutes</p>
                  </div>
                )}
                {movie.budget > 0 && (
                  <div>
                    <p className="text-slate-400">Budget:</p>
                    <p className="font-bold">${(movie.budget / 1000000).toFixed(1)}M</p>
                  </div>
                )}
                {movie.revenue > 0 && (
                  <div>
                    <p className="text-slate-400">Box Office:</p>
                    <p className="font-bold">${(movie.revenue / 1000000).toFixed(0)}M</p>
                  </div>
                )}
              </div>

              {/* Actions Buttons */}
              <div className="flex gap-3">
                {trailerKey && (
                  <button
                    onClick={() => setShowTrailerModal(true)}
                    className="flex-1 bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
                  >
                    🎬 Watch Trailer
                  </button>
                )}
                <button
                  onClick={() => onAddToWatchlist(movie)}
                  className={`flex-1 ${ 
                    isInWatchlist
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : "bg-slate-700 hover:bg-slate-600"
                  } px-6 py-2 rounded-lg font-bold transition-colors`}
                >
                  {isInWatchlist ? "❤️ In Watchlist" : "🤍 Add to Watchlist"}
                </button>
              </div>
            </div>
          </div>

          {/* Two Column Layout for Additional Features */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Left: Rating and Collections */}
            <div className="lg:col-span-1 space-y-4">
              <RatingComponent movieId={movieId} />
              <CollectionsManager movieId={movieId} movieTitle={movie.title} />
            </div>

            {/* Right: Where to Watch */}
            <div className="lg:col-span-2">
              <WhereToWatch movieId={movieId} />
            </div>
          </div>

          {/* Overview */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-3">Overview</h2>
            <p className="text-slate-300 leading-relaxed">
              {movie.overview || "No overview available"}
            </p>
          </div>

          {/* Cast */}
          {cast.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Cast</h2>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {cast.map((member) => (
                  <div key={member.id} className="text-center">
                    {member.profile_path && (
                      <img
                        src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                        alt={member.name}
                        className="w-full h-40 object-cover rounded-lg mb-2"
                      />
                    )}
                    <p className="font-bold text-sm">{member.name}</p>
                    <p className="text-slate-400 text-xs">{member.character}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Similar Movies */}
          {similar.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Similar Movies</h2>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {similar.map((sm) => (
                  <div key={sm.id} className="cursor-pointer transform hover:scale-105 transition">
                    <img
                      src={
                        sm.poster_path
                          ? `https://image.tmdb.org/t/p/w200${sm.poster_path}`
                          : "/fallback.jpg"
                      }
                      alt={sm.title}
                      className="w-full rounded-lg"
                    />
                    <p className="text-sm mt-2 text-center truncate">{sm.title}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Trailer Modal */}
      <TrailerModal
        trailerKey={trailerKey}
        movieTitle={movie?.title}
        isOpen={showTrailerModal}
        onClose={() => setShowTrailerModal(false)}
      />
    </div>
  );
}
