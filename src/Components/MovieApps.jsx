import axios from "axios";
import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import AdvancedSearchBar from "./AdvancedSearchBar";
import FilterBar from "./FilterBar";
import MovieDetail from "./MovieDetail";
import RecentlyViewed from "./RecentlyViewed";
import RecommendedMovies from "./RecommendedMovies";
import TrendingMovies from "./TrendingMovies";
import Img from "../assets/cut.jpg";  // logo
import bgImg from "../assets/dark.avif"; // background image
import useWatchlist from "../hooks/useWatchlist";

export default function MovieApp() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [genres, setGenres] = useState([]);
  const [loadingGenres, setLoadingGenres] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [filters, setFilters] = useState({ genre: "", year: "", minRating: "" });
  const [sortBy, setSortBy] = useState("popularity");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const API_KEY = import.meta.env.VITE_API_KEY;
  const { addToWatchlist, isInWatchlist } = useWatchlist();

  // Fetch genres on mount
  useEffect(() => {
    fetchGenres();
    setupInfiniteScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch popular movies on first load
  useEffect(() => {
    fetchPopularMovies();
  }, []);

  // Apply filters and sorting whenever movies, filters, or sort changes
  useEffect(() => {
    applyFiltersAndSort();
  }, [movies, filters, sortBy]);

  // Load more movies when page changes
  useEffect(() => {
    if (page > 1) {
      loadMorePopularMovies();
    }
  }, [page]);

  // Setup infinite scroll listener
  const setupInfiniteScroll = () => {
    window.addEventListener('scroll', handleScroll);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.scrollHeight - 500
    ) {
      if (hasMore && !loadingMore && !loading && !searchQuery) {
        setPage((prev) => prev + 1);
      }
    }
  };

  const fetchGenres = async () => {
    setLoadingGenres(true);
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
      );
      setGenres(res.data.genres);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingGenres(false);
    }
  };

  const fetchPopularMovies = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=1`
      );
      setMovies(res.data.results);
      setError("");
      setHasMore(res.data.page < res.data.total_pages);
    } catch (err) {
      console.error(err);
      setError("Failed to load popular movies");
    } finally {
      setLoading(false);
    }
  };

  const loadMorePopularMovies = async () => {
    setLoadingMore(true);
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`
      );
      setMovies((prev) => [...prev, ...res.data.results]);
      setError("");
      setHasMore(res.data.page < res.data.total_pages);
    } catch (err) {
      console.error(err);
      setError("Failed to load more movies");
    } finally {
      setLoadingMore(false);
    }
  };

  const searchMovies = async (query) => {
    setLoading(true);
    setPage(1);
    setSearchQuery(query);
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
      );

      if (res.data.results.length > 0) {
        setMovies(res.data.results);
        setError("");
        setHasMore(res.data.page < res.data.total_pages);
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

  const searchByActor = async (actorName) => {
    setLoading(true);
    setPage(1);
    setSearchQuery(actorName);
    try {
      // First, search for the actor
      const actorRes = await axios.get(
        `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&query=${actorName}`
      );

      if (actorRes.data.results.length === 0) {
        setMovies([]);
        setError(`Actor "${actorName}" not found`);
        setLoading(false);
        return;
      }

      const actor = actorRes.data.results[0];
      const actorId = actor.id;

      // Get the actor's filmography
      const creditsRes = await axios.get(
        `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${API_KEY}`
      );

      const actorMovies = creditsRes.data.cast
        .filter((m) => m.poster_path) // Only movies with posters
        .sort((a, b) => new Date(b.release_date) - new Date(a.release_date)) // Sort by date
        .slice(0, 30); // Limit to 30 movies

      if (actorMovies.length > 0) {
        setMovies(actorMovies);
        setError("");
        setHasMore(false);
      } else {
        setMovies([]);
        setError(
          `No movies found for actor "${actor.name}"`
        );
      }
    } catch (err) {
      console.error(err);
      setError("Error searching for actor");
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSort = () => {
    let result = [...movies];

    // Apply genre filter
    if (filters.genre) {
      result = result.filter((m) =>
        m.genre_ids && m.genre_ids.includes(parseInt(filters.genre))
      );
    }

    // Apply year filter
    if (filters.year) {
      result = result.filter(
        (m) => m.release_date && m.release_date.startsWith(filters.year)
      );
    }

    // Apply rating filter
    if (filters.minRating) {
      result = result.filter((m) => m.vote_average >= parseFloat(filters.minRating));
    }

    // Apply sorting
    switch (sortBy) {
      case "popularity":
        result.sort((a, b) => b.popularity - a.popularity);
        break;
      case "rating":
        result.sort((a, b) => b.vote_average - a.vote_average);
        break;
      case "release_date":
        result.sort(
          (a, b) =>
            new Date(b.release_date || 0) - new Date(a.release_date || 0)
        );
        break;
      case "title":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    setFilteredMovies(result);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-900 via-slate-950 to-black">
      {/* HEADER */}
      <div className="bg-gradient-to-b from-slate-800/50 to-transparent backdrop-blur-md border-b border-emerald-500/10 pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-violet-500 rounded-lg blur opacity-75"></div>
              <img src={Img} alt="Logo" className="relative w-auto h-16 rounded-lg" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-violet-400 bg-clip-text text-transparent">ScreenFlix</h1>
              <p className="text-emerald-300/80 text-sm md:text-base font-light tracking-widest mt-1">EXPLORE THE WORLD OF CINEMA</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* SEARCH BAR */}
        <div className="mb-8">
          <AdvancedSearchBar onSearch={searchMovies} onActorSearch={searchByActor} />
        </div>

        {/* FILTER BAR */}
        <div className="mb-8">
          <FilterBar
            onFilterChange={setFilters}
            onSortChange={setSortBy}
            genres={genres}
            loadingGenres={loadingGenres}
          />
        </div>

        {/* RECENTLY VIEWED */}
        {!searchQuery && (
          <div className="mb-12">
            <RecentlyViewed 
              onMovieClick={setSelectedMovie}
            />
          </div>
        )}

        {/* TRENDING THIS WEEK */}
        {!searchQuery && (
          <div className="mb-12">
            <TrendingMovies 
              onMovieClick={setSelectedMovie}
            />
          </div>
        )}

        {/* RECOMMENDATIONS */}
        {!searchQuery && (
          <div className="mb-12">
            <RecommendedMovies 
              onMovieClick={setSelectedMovie}
            />
          </div>
        )}

        {/* RESULTS */}
        <div className="w-full">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-violet-500 rounded-full animate-spin"></div>
                <div className="absolute inset-2 bg-slate-950 rounded-full"></div>
              </div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="text-6xl mb-4">🎬</div>
              <p className="text-xl text-red-400 font-semibold">{error}</p>
            </div>
          ) : filteredMovies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8 pb-20">
              {filteredMovies.map((m) => (
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
            <div className="flex flex-col items-center justify-center py-20">
              <div className="text-6xl mb-4">😢</div>
              <p className="text-xl text-slate-400 font-semibold">No movies found</p>
            </div>
          )}
        </div>

        {/* Loading More Indicator */}
        {loadingMore && (
          <div className="w-full text-center py-12">
            <div className="inline-block">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-violet-500 rounded-full animate-spin"></div>
                <div className="absolute inset-2 bg-slate-950 rounded-full flex items-center justify-center">
                  <span className="text-xs text-emerald-400 font-bold">...</span>
                </div>
              </div>
            </div>
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
