import {useEffect, useState}from 'react'
import axios from "axios";
import MovieCard from "./MovieCard"
import MovieDetail from "./MovieDetail";
import useWatchlist from "../hooks/useWatchlist";


function TopRatedMovies(){
    const [movies, setMovies]= useState([])
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState("");
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const { addToWatchlist, isInWatchlist } = useWatchlist();



       const API_KEY = import.meta.env.VITE_API_KEY;
  const TOP_RATED_URL = import.meta.env.VITE_TOP_RATED_URL;
 
   useEffect(() => {
    fetchTopRated();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (page > 1) {
      loadMoreTopRated();
    }
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.scrollHeight - 500
    ) {
      if (hasMore && !loadingMore && !loading) {
        setPage((prev) => prev + 1);
      }
    }
  };

  const fetchTopRated = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${TOP_RATED_URL}?language=en-US&page=1&api_key=${API_KEY}`);
      console.log("Fetched Top Rated:", response.data.results);
      setMovies(response.data.results);
      setError("");
      setHasMore(response.data.page < response.data.total_pages);
    } catch (err) {
      console.error(err);
      setError("Failed to load top rated movies");
    } finally {
      setLoading(false);
    }
  };

  const loadMoreTopRated = async () => {
    setLoadingMore(true);
    try {
      const response = await axios.get(`${TOP_RATED_URL}?language=en-US&page=${page}&api_key=${API_KEY}`);
      setMovies((prev) => [...prev, ...response.data.results]);
      setError("");
      setHasMore(response.data.page < response.data.total_pages);
    } catch (err) {
      console.error(err);
      setError("Failed to load more movies");
    } finally {
      setLoadingMore(false);
    }
  };

    return(
         <div className="min-h-screen w-full bg-gradient-to-b from-slate-900 via-slate-950 to-black">
      {/* Header */}
      <div className="bg-gradient-to-b from-slate-800/50 to-transparent backdrop-blur-md border-b border-amber-500/10 pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent mb-3">⭐ Top Rated Movies</h1>
            <p className="text-amber-300/80 text-sm md:text-base font-light tracking-widest">BEST RATED FILMS</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full animate-spin"></div>
              <div className="absolute inset-2 bg-slate-950 rounded-full"></div>
            </div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-6xl mb-4">⚠️</div>
            <p className="text-xl text-red-400 font-semibold">{error}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8 pb-20">
              {movies.filter((m)=> m.poster_path)
              .map((m) => (
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
            {loadingMore && (
              <div className="w-full text-center py-12">
                <div className="inline-block">
                  <div className="relative w-12 h-12">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-2 bg-slate-950 rounded-full flex items-center justify-center">
                      <span className="text-xs text-amber-400 font-bold">...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      
      {selectedMovie && (
        <MovieDetail
          movieId={selectedMovie.id}
          onClose={() => setSelectedMovie(null)}
          onAddToWatchlist={addToWatchlist}
          isInWatchlist={isInWatchlist(selectedMovie.id)}
        />
      )}
    </div>
    )
}


export default TopRatedMovies