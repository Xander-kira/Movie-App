import React, { useState, useEffect, useCallback } from "react";

export default function FilterBar({
  onFilterChange,
  onSortChange,
  genres,
  loadingGenres,
}) {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [sortBy, setSortBy] = useState("popularity");
  const [ratingFilter, setRatingFilter] = useState("");

  const handleFilterChange = useCallback(() => {
    onFilterChange({
      genre: selectedGenre,
      year: selectedYear,
      minRating: ratingFilter,
    });
  }, [selectedGenre, selectedYear, ratingFilter, onFilterChange]);

  const handleSortChange = useCallback(() => {
    onSortChange(sortBy);
  }, [sortBy, onSortChange]);

  useEffect(() => {
    handleFilterChange();
  }, [handleFilterChange]);

  useEffect(() => {
    handleSortChange();
  }, [handleSortChange]);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  return (
    <div className="bg-gray-800 bg-opacity-80 backdrop-blur-sm p-6 rounded-xl w-full max-w-5xl mx-auto mb-8 text-white">
      <h2 className="text-xl font-bold mb-4">🎨 Filters & Sorting</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Genre Filter */}
        <div>
          <label className="block text-sm font-semibold mb-2">Genre</label>
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
          >
            <option value="">All Genres</option>
            {loadingGenres ? (
              <option disabled>Loading...</option>
            ) : (
              genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))
            )}
          </select>
        </div>

        {/* Year Filter */}
        <div>
          <label className="block text-sm font-semibold mb-2">Year</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
          >
            <option value="">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Rating Filter */}
        <div>
          <label className="block text-sm font-semibold mb-2">Min Rating</label>
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
          >
            <option value="">All Ratings</option>
            <option value="5">5.0+</option>
            <option value="6">6.0+</option>
            <option value="7">7.0+</option>
            <option value="8">8.0+</option>
            <option value="9">9.0+</option>
          </select>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-sm font-semibold mb-2">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
          >
            <option value="popularity">Popularity (High to Low)</option>
            <option value="rating">Rating (High to Low)</option>
            <option value="release_date">Release Date (Newest)</option>
            <option value="title">Title (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      {(selectedGenre || selectedYear || ratingFilter) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {selectedGenre && (
            <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">
              Genre: {genres.find((g) => g.id === parseInt(selectedGenre))?.name}
              <button
                onClick={() => setSelectedGenre("")}
                className="ml-2 font-bold hover:text-red-200"
              >
                ✕
              </button>
            </span>
          )}
          {selectedYear && (
            <span className="bg-green-600 px-3 py-1 rounded-full text-sm">
              Year: {selectedYear}
              <button
                onClick={() => setSelectedYear("")}
                className="ml-2 font-bold hover:text-red-200"
              >
                ✕
              </button>
            </span>
          )}
          {ratingFilter && (
            <span className="bg-yellow-600 px-3 py-1 rounded-full text-sm">
              Rating: {ratingFilter}+
              <button
                onClick={() => setRatingFilter("")}
                className="ml-2 font-bold hover:text-red-200"
              >
                ✕
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
