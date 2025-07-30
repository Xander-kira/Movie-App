import axios from "axios";
import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import SearchBar from "./SearchBar";
import Img from "../assets/cut.jpg";  // logo
import bgImg from "../assets/dark.avif"; // background image

export default function MovieApp() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_API_KEY;

  // Fetch popular movies on first load
  useEffect(() => {
    fetchPopularMovies();
  }, []);

  const fetchPopularMovies = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      );
      setMovies(res.data.results);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load popular movies");
    } finally {
      setLoading(false);
    }
  };

  const searchMovies = async (query) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
      );

      if (res.data.results.length > 0) {
        setMovies(res.data.results);
        setError("");
      } else {
        setMovies([]);
        setError(`"${query}" is not available at the moment`);
      }
    } catch (err) {
      console.error(err);
      setError("Error searching for movies");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col items-center bg-cover  bg-no-repeat min-h-full w-full  bg-center   "
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      {/* HEADER */}
      <div className="flex items-center mt-10">
        <img src={Img} alt="Logo" className="w-[190px] h-20 border-[5px] border-amber-300" />
        <h1 className="text-4xl text-white mx-5 font-bold sm:text-3xl md:text-4xl lg:text-5xl ">ScreenFlix</h1>
      </div>

      <p className="text-2xl text-white text-center pt-2 sm:text-base md:text-lg">
        Explore the world of cinema
      </p>

      {/* SEARCH BAR */}
      <SearchBar onSearch={searchMovies} />

      {/* RESULTS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 p-10 sm:gap-8 lg:gap-10  sm:p-6 lg:p-10">
        {loading ? (
          <p className="text-white">Loading...</p>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : movies.length > 0 ? (
          movies.map((m) => (
            <MovieCard
              key={m.id}
              title={m.title}
              date={m.release_date}
              poster={m.poster_path}
              popularity={m.popularity}
            />
          ))
        ) : (
          <p className="text-white">No movies found</p>
        )}
      </div>
    </div>
  );
}
