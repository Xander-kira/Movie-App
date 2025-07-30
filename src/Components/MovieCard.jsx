import React from "react";

export default function MovieCard({ poster, title, date, popularity }) {
  const imageURL = poster
    ? `https://image.tmdb.org/t/p/w500/${poster}`
    : "/fallback.jpg"; // fallback image if movie has no poster

  return (
    <div className="  min-w-[200px] bg-gray-900 text-white rounded-xl overflow-hidden shadow-md 
    transform transition-all duration-300 
    hover:scale-105 hover:-translate-y-2 
    hover:shadow-[0_0_25px_rgba(255,0,150,0.6)]">
      <img src={imageURL} alt={title} className="w-full h-50 sm:h-34 md:h42 lg:h-50 object-cover" />
      <div className="p-3">
        <p className="font-bold">{title}</p>
        <p className="text-sm">📅 {date}</p>
        <p className="text-sm">⭐ Popularity: {popularity}</p>
      </div>
    </div>
  );
}
