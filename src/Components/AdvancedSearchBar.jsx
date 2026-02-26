import React, { useState } from "react";

export default function AdvancedSearchBar({ onSearch, onActorSearch }) {
  const [query, setQuery] = useState("");
  const [searchMode, setSearchMode] = useState("title"); // "title" or "actor"

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      if (searchMode === "title") {
        onSearch(query);
      } else {
        onActorSearch(query);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Search Mode Tabs */}
      <div className="flex gap-2 justify-center flex-wrap">
        <button
          onClick={() => setSearchMode("title")}
          className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 text-sm md:text-base backdrop-blur-sm ${
            searchMode === "title"
              ? "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-500/40"
              : "bg-slate-700/50 text-slate-300 hover:bg-slate-600/70"
          }`}
        >
          🎬 Movie
        </button>
        <button
          onClick={() => setSearchMode("actor")}
          className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 text-sm md:text-base backdrop-blur-sm ${
            searchMode === "actor"
              ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/40"
              : "bg-slate-700/50 text-slate-300 hover:bg-slate-600/70"
          }`}
        >
          👤 Actor
        </button>
      </div>

      {/* Search Input */}
      <form onSubmit={handleSubmit} className="relative group w-full max-w-2xl mx-auto">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-violet-500 rounded-xl blur opacity-0 group-focus-within:opacity-75 transition duration-300"></div>
        <input
          type="text"
          placeholder={
            searchMode === "title"
              ? "Search movies, shows, and more..."
              : "Find movies by actor name..."
          }
          className="relative w-full px-5 py-3 md:py-4 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-base md:text-lg transition-colors duration-300"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button 
          type="submit"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 text-emerald-400 hover:text-emerald-300 transition-colors duration-300"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </form>

      {/* Helper Text */}
      <p className="text-slate-400 text-xs md:text-sm text-center font-light tracking-wide">
        {searchMode === "title"
          ? "✨ Search across thousands of movies and shows"
          : "✨ Discover all movies featuring your favorite actors"}
      </p>
    </div>
  );
}
