import React, { useState } from "react";
import MovieCard from "./MovieCard";
import MovieDetail from "./MovieDetail";
import useWatchlist from "../hooks/useWatchlist";

export default function Watchlist() {
  const { watchlist, addToWatchlist, isInWatchlist } = useWatchlist();
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-900 via-slate-950 to-black">
      {/* Header */}
      <div className="bg-gradient-to-b from-slate-800/50 to-transparent backdrop-blur-md border-b border-rose-500/10 pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-400 via-red-400 to-pink-400 bg-clip-text text-transparent mb-3">❤️ My Watchlist</h1>
            <p className="text-rose-300/80 text-sm md:text-base font-light tracking-widest">
              {watchlist.length} movie{watchlist.length !== 1 ? "s" : ""} saved
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Content */}
        {watchlist.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8 pb-20">
            {watchlist.map((m) => (
              <div
                key={m.id}
                onClick={() => setSelectedMovie(m)}
                className="aspect-video rounded-2xl overflow-hidden cursor-pointer"
              >
                <MovieCard
                  title={m.title}
                  date={m.release_date}
                  poster={m.poster_path}
                  popularity={m.popularity}
                  onFavoriteClick={() => addToWatchlist(m)}
                  isFavorited={isInWatchlist(m.id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="text-7xl mb-6 animate-bounce">🎬</div>
            <p className="text-2xl text-slate-300 mb-2 font-semibold">Your watchlist is empty</p>
            <p className="text-slate-400 text-lg">Start adding movies to get started!</p>
          </div>
        )}
      </div>

      {/* Movie Detail Modal */}
      {selectedMovie && (
        <MovieDetail
          movieId={selectedMovie.id}
          onClose={() => setSelectedMovie(null)}
          onAddToWatchlist={addToWatchlist}
          isInWatchlist={isInWatchlist(selectedMovie.id)}
        />
      )}
    </div>
  );
}
