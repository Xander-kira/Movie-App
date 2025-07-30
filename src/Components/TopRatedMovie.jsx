import {useEffect, useState}from 'react'
import axios from "axios";
import bgImg from "../assets/dark.avif"; 
import MovieCard from "./MovieCard"


function TopRatedMovies(){
    const [movies, setMovies]= useState([])
    const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");



       const API_KEY = import.meta.env.VITE_API_KEY;
  const TOP_RATED_URL = import.meta.env.VITE_TOP_RATED_URL;
 
   useEffect(() => {
    const fetchTopRated = async () => {
      setLoading(true);
      try {
   
        const response = await axios.get(`${TOP_RATED_URL}?language=en-US&page=1&api_key=${API_KEY}`);
 console.log("Fetched Top Rated:", response.data.results); // helpful for debugging
        setMovies(response.data.results);
        setError("");
        
      
      
        
      } catch (err) {
        console.error(err);
        setError("Failed to load top rated movies");
      } finally {
        setLoading(false);
      }
      
      
    };

    fetchTopRated();
  }, []);

    return(
         <div className="flex flex-col items-center bg-cover   bg-no-repeat min-h-full w-full  bg-center   "
               style={{ backgroundImage: `url(${bgImg})` }}>
      <h2 className="text-2xl font-bold text-white mb-4 ">⭐ Top Rated Movies</h2>
      {loading ? (
        <p className="text-white">Loading...</p>
      ) : error ? (
        <p className="text-red-400">{error}</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 p-20">
          {movies.filter((m)=> m.poster_path)
          .map((m) => (
            <MovieCard
              key={m.id}
              title={m.title}
              date={m.release_date}
              poster={m.poster_path}
              popularity={m.popularity}
            />
          ))}
        </div>
      )}
    </div>
    )
}


export default TopRatedMovies