import React from "react";

export default function MovieCard({
  poster,
  title,
  date,
  popularity,
  onClick,
  onFavoriteClick,
  isFavorited,
}) {
  const imageURL = poster
    ? `https://image.tmdb.org/t/p/w500/${poster}`
    : "/fallback.jpg";

  return (
    <div
      onClick={onClick}
      className="group relative w-full h-full rounded-2xl overflow-hidden cursor-pointer
        transform transition-all duration-500 ease-out
        hover:scale-110 hover:-translate-y-3
        shadow-lg hover:shadow-2xl"
    >
      {/* Background Image */}
      <img
        src={imageURL}
        alt={title}
        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-75"
      />

      {/* Gradient Overlay - Always visible at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/60 to-transparent opacity-100 transition-opacity duration-300"></div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Shimmer Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500 group-hover:animate-pulse"></div>

      {/* Favorite Button */}
      {onFavoriteClick && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteClick();
          }}
          className={`absolute top-3 right-3 text-3xl opacity-0 group-hover:opacity-100 
            transition-all duration-300 transform group-hover:scale-110
            drop-shadow-xl backdrop-blur-sm p-1 rounded-lg
            ${
              isFavorited
                ? "text-red-500 bg-red-600/20"
                : "text-white hover:text-red-500 bg-white/10"
            }`}
        >
          {isFavorited ? "❤️" : "🤍"}
        </button>
      )}

      {/* Title - Always Visible */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
        <h3 className="font-bold text-sm md:text-base lg:text-lg text-white line-clamp-2 drop-shadow-lg">
          {title}
        </h3>
      </div>

      {/* Details - Visible on Hover */}
      <div className="absolute bottom-0 left-0 right-0 p-4 space-y-1 max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-300 z-20">
        <div className="space-y-1 text-xs md:text-sm text-emerald-100 drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
          <p className="flex items-center gap-1">📅 {date}</p>
          <p className="flex items-center gap-1">⭐ {popularity.toFixed(1)}/10</p>
        </div>
      </div>

      {/* Decorative Border on Hover */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-emerald-400 group-hover:to-violet-500 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"></div>
    </div>
  );
}
