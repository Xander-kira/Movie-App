import React, { useState } from "react";
import Img2 from "../assets/search.png"; // your search icon

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      onSearch(query); // tells the main app to search for this query
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative mt-3"
    >
      <input
        type="text"
        placeholder="Search for movies"
        className="w-[800px] p-3 pr-10 rounded-xl border border-white bg-transparent text-white placeholder-gray-300 focus:outline-none text-base sm:text-lg"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">
        <img
          src={Img2}
          alt="Search"
          className="absolute top-1/2 right-2 transform -translate-y-1/2  h-6 w-[40px] sm:w-6"
        />
      </button>
    </form>
  );
}
